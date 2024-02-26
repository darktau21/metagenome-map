import { PrismaClient } from '@prisma/client';
import { polygon, type LatLngLiteral } from 'leaflet';

type AreaPolygonGeoObject = {
  type: 'Polygon';
  coordinates: [[lng: number, lat: number]];
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
        async findMany({ take = 3000, skip = 0 } = {}): Promise<
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
          const result = await prisma.$queryRaw<{ id: number | null }[]>`
              INSERT INTO sample.coords (id, point)
              VALUES (DEFAULT, ST_GeomFromText(${data}, 4326)) 
              ON CONFLICT DO NOTHING
              RETURNING id;
            `;

          return result;
        },

        async findFirst(data: string) {
          const result = await prisma.$queryRaw<{ id: number | null }[]>`
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
