import { Prisma, PrismaClient } from '@prisma/client';
import { type LatLngLiteral } from 'leaflet';

type Point = [lng: number, lat: number];

type AreaPolygonGeoObject = {
  coordinates: [Point[]];
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

type SamplePointGeoObject = {
  coordinates: Point;
  type: 'Point';
};

type SamplePointResponse = {
  id: number;
  point: string;
};

type SamplePointResult = {
  id: number;
  point: SamplePointGeoObject;
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
            OFFSET ${skip}
          `;

          const convertedResult = result.map(({ polygon, ...data }) => ({
            ...data,
            polygon: JSON.parse(polygon) as AreaPolygonGeoObject,
          }));

          return convertedResult;
        },
        async findManyWithPhylum(phylumId: number) {
          const result = await prisma.$queryRaw<
            (AreaPolygonResponse & { phylumId: number; value: number })[]
          >`
            SELECT c.id as id, ST_AsGeoJson(polygon) as polygon, v.value as value, v.phylum_id as phylumId
            FROM area.coords c
            JOIN area.areas a on c.id = a.coords_id
            JOIN metagenome.metagenomes m on a.metagenome_id = m.id
            JOIN metagenome.phylum_values v on m.id = v.metagenome_id
            WHERE v.phylum_id = ${phylumId}
            ORDER BY v.value
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
          const result = await prisma.$queryRaw<SamplePointResponse[]>`
              INSERT INTO sample.coords (id, point)
              VALUES (DEFAULT, ST_GeomFromText(${data}, 4326)) 
              ON CONFLICT DO NOTHING
              RETURNING id;
            `;

          return result;
        },

        async findFirst(data: string) {
          const result = await prisma.$queryRaw<SamplePointResponse[]>`
            SELECT id
            FROM sample.coords
            WHERE ST_Equals(point::geometry, ST_GeomFromText(${data}, 4326))
            LIMIT 1;
          `;

          return result[0];
        },
        async findMany({ skip = 0, take = 3000 } = {}): Promise<
          SamplePointResult[]
        > {
          const result = await prisma.$queryRaw<SamplePointResponse[]>`
            SELECT id, ST_AsGeoJson(point) as point
            FROM sample.coords
            LIMIT ${take}
            OFFSET ${skip}
          `;

          const convertedResult = result.map(({ point, ...data }) => ({
            ...data,
            point: JSON.parse(point) as SamplePointGeoObject,
          }));

          return convertedResult;
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
