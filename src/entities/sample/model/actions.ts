'use server';

import type { LatLng } from '@/shared/types';

import { prisma } from '@/shared/lib';

type Property =
  | {
      name: string;
      units: null | string;
      value: number;
    }
  | {
      name: string;
      value: string;
    };

type FloatProperty = {
  property: {
    group: {
      name: string;
    } | null;
    name: string;
    units: null | string;
  };
  value: number;
};

type StringProperty = {
  property: { group: { name: string } | null; name: string };
  value: { value: string };
};

const isFloatProperty = (
  property: FloatProperty | StringProperty,
): property is FloatProperty => typeof property.value === 'number';

function convertSampleData(sample: {
  floatProperties: FloatProperty[];
  id: number;
  name: string;
  selectionDate: Date;
  stringProperties: StringProperty[];
}) {
  const { floatProperties, id, name, selectionDate, stringProperties } = sample;
  const propertyGroups = new Map<null | string, Property[]>();
  const properties = [...floatProperties, ...stringProperties];

  properties.forEach((item) => {
    const groupName = item.property.group?.name ?? null;

    if (!propertyGroups.has(groupName)) {
      propertyGroups.set(groupName, []);
    }

    if (isFloatProperty(item)) {
      propertyGroups.get(groupName)?.push({
        name: item.property.name,
        units: item.property.units,
        value: item.value,
      });
    } else {
      propertyGroups.get(groupName)?.push({
        name: item.property.name,
        value: item.value.value,
      });
    }
  });

  return {
    id,
    name,
    properties: Object.fromEntries(propertyGroups),
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
