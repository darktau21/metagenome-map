'use server';

import type { LatLng } from '@/shared/types';

import { type StringProperty, prisma } from '@/shared/lib';
import { type FloatProperty, convertProperties } from '@/shared/lib';

function convertSampleData(sample: {
  floatProperties: FloatProperty[];
  id: number;
  name: string;
  selectionDate: Date;
  stringProperties: StringProperty[];
}) {
  const { floatProperties, id, name, selectionDate, stringProperties } = sample;

  return {
    id,
    name,
    properties: convertProperties([...floatProperties, ...stringProperties]),
    selectionDate,
  };
}

export async function getSamplesCoords() {
  const points = await prisma.sampleCoords.findMany();

  return points.map(({ id, point }) => ({
    id,
    point: [point.coordinates[1], point.coordinates[0]] as LatLng,
  }));
}

export async function getSample(id: number) {
  const sample = await prisma.sample.findFirst({
    select: {
      floatProperties: {
        select: {
          property: {
            select: {
              group: {
                select: {
                  name: true,
                },
              },
              name: true,
              units: true,
            },
          },
          value: true,
        },
      },
      id: true,
      name: true,
      selectionDate: true,
      stringProperties: {
        select: {
          property: {
            select: {
              group: {
                select: {
                  name: true,
                },
              },
              name: true,
            },
          },
          value: {
            select: {
              value: true,
            },
          },
        },
      },
    },
    where: {
      id,
    },
  });

  if (!sample) {
    return null;
  }

  return convertSampleData(sample);
}
