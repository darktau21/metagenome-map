import { Prisma, PrismaClient } from '@prisma/client';
import { type LatLngLiteral } from 'leaflet';

type AreaPolygonGeoObject = {
  coordinates: [[lng: number, lat: number][]];
  type: 'Polygon';
};

type AreaPolygonResponse = {
  id: number;
  polygon: string;
};

type AreaPolygonResult = {
  id: number;
  polygon: AreaPolygonGeoObject;
};

const prismaClientSingleton = () => {
  const prisma = new PrismaClient().$extends({
    model: {
      area: {
        async findEqualCoords<T extends Prisma.AreaFindManyArgs>(
          id: number,
          args?: T,
        ) {
          const { where: whereArg } = args ?? {};
          const { coords_id: coordsId } = (
            await prisma.$queryRaw<[{ coords_id: number }]>`
              SELECT coords_id
              FROM area.areas
              WHERE id = ${id}
          `
          )[0];

          return prisma.area.findMany({
            ...args,
            where: {
              ...whereArg,
              NOT: {
                id,
              },
              coordsId,
            },
          });
        },
      },
      areaCoords: {
        async create({
          data,
        }: {
          data: LatLngLiteral[];
        }): Promise<AreaPolygonResult | null> {
          const polygon = `POLYGON((${data.map(({ lat, lng }) => `${lng} ${lat}`).join(',')}))`;

          const [result] = await prisma.$queryRaw<AreaPolygonResponse[]>`
              INSERT INTO area.coords (id, polygon)
              VALUES (DEFAULT, ST_GeomFromText(${polygon}, 4326)) 
              ON CONFLICT DO NOTHING
              RETURNING id, ST_AsGeoJson(polygon) as polygon;
            `;

          if (!result) {
            return null;
          }

          return {
            ...result,
            polygon: JSON.parse(result.polygon) as AreaPolygonGeoObject,
          };
        },

        async findFirst(id: number): Promise<AreaPolygonResult | null> {
          const [result] = await prisma.$queryRaw<AreaPolygonResponse[]>`
            SELECT id, ST_AsGeoJson(polygon) as polygon
            FROM area.coords
            WHERE ${id} = id
            LIMIT 1;
          `;

          if (!result) {
            return null;
          }

          return {
            ...result,
            polygon: JSON.parse(result.polygon) as AreaPolygonGeoObject,
          };
        },
        async findMany({ skip = 0, take = 3000 } = {}): Promise<
          AreaPolygonResult[]
        > {
          const result = await prisma.$queryRaw<AreaPolygonResponse[]>`
            SELECT id, ST_AsGeoJson(polygon) as polygon
            FROM area.coords
            LIMIT ${take}
          `;

          const convertedResult = result.map(({ polygon, ...data }) => ({
            ...data,
            polygon: JSON.parse(polygon) as AreaPolygonGeoObject,
          }));

          return convertedResult;
        },
      },
      sampleCoords: {
        async create(data: string) {
          const result = await prisma.$queryRaw<{ id: null | number }[]>`
              INSERT INTO sample.coords (id, point)
              VALUES (DEFAULT, ST_GeomFromText(${data}, 4326)) 
              ON CONFLICT DO NOTHING
              RETURNING id;
            `;

          return result;
        },

        async findFirst(data: string) {
          const result = await prisma.$queryRaw<{ id: null | number }[]>`
            SELECT id
            FROM sample.coords
            WHERE ST_Equals(point::geometry, ST_GeomFromText(${data}, 4326))
            LIMIT 1;
          `;

          return result[0];
        },
      },
    },
  });
  return prisma;
};

declare global {
  var prisma: ReturnType<typeof prismaClientSingleton> | undefined;
}

export const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
