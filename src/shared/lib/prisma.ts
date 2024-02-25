import { PrismaClient } from '@prisma/client';
import { type LatLngLiteral } from 'leaflet';
import _ from 'lodash';

const prismaClientSingleton = () => {
  const prisma = new PrismaClient().$extends({
    model: {
      areaCoords: {
        async create(data: string) {
          // if (!_.isEqual(data[0], data.at(-1))) {
          //   data.push(_.clone(data[0]));
          // }

          // const polygon = `POLYGON((${data
          //   .map(({ lat, lng }) => `${lng} ${lat}`)
          //   .join(",")}))`;

          const result = await prisma.$queryRaw<
            { id: number; st_asgeojson: null | string }[]
          >`
              INSERT INTO area.coords (id, polygon)
              VALUES (DEFAULT, ST_GeomFromText(${data}, 4326)) 
              ON CONFLICT DO NOTHING
              RETURNING id, ST_AsGeoJson(polygon);
            `;

          return result[0];
        },

        async findFirst(data: string) {
          // if (!_.isEqual(data[0], data.at(-1))) {
          //   data.push(_.clone(data[0]));
          // }
          // console.log("equals?", _.isEqual(data[0], data.at(-1)));

          // const polygon = `POLYGON((${data
          //   .map(({ lat, lng }) => `${lng} ${lat}`)
          //   .join(",")}))`;

          const result = await prisma.$queryRaw<{ id: number }[]>`
            SELECT id
            FROM area.coords 
            WHERE ST_Equals(polygon::geometry, ST_PolygonFromText(${data}, 4326))
            LIMIT 1;
          `;

          return result[0];
        },
      },
      sampleCoords: {
        async create(data: string) {
          // if (!_.isEqual(data[0], data.at(-1))) {
          //   data.push(_.clone(data[0]));
          // }

          // const polygon = `POLYGON((${data
          //   .map(({ lat, lng }) => `${lng} ${lat}`)
          //   .join(",")}))`;

          const result = await prisma.$queryRaw<
            { id: number; st_asgeojson: null | string }[]
          >`
              INSERT INTO sample.coords (id, point)
              VALUES (DEFAULT, ST_GeomFromText(${data}, 4326)) 
              ON CONFLICT DO NOTHING
              RETURNING id, ST_AsGeoJson(point);
            `;

          return result;
        },

        async findFirst(data: string) {
          // if (!_.isEqual(data[0], data.at(-1))) {
          //   data.push(_.clone(data[0]));
          // }
          // console.log("equals?", _.isEqual(data[0], data.at(-1)));

          // const polygon = `POLYGON((${data
          //   .map(({ lat, lng }) => `${lng} ${lat}`)
          //   .join(",")}))`;

          const result = await prisma.$queryRaw<{ id: number }[]>`
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
