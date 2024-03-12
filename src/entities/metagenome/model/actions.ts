'use server';

import { GRADIENT_FROM, GRADIENT_TO, prisma } from '@/shared/lib';

const convertProperty = ({
  phylum,
  value,
}: {
  phylum: { name: string };
  value: number;
}) => ({
  name: phylum.name,
  value,
});

export async function getPhylum(id: number) {
  const metagenome = await prisma.metagenome.findFirst({
    select: {
      id: true,
      properties: {
        select: {
          phylum: {
            select: {
              name: true,
            },
          },
          value: true,
        },
      },
    },
    where: {
      id,
    },
  });

  return {
    ...metagenome,
    properties: metagenome?.properties.map(convertProperty),
  };
}

export async function getPhylumList() {
  const phylums = await prisma.phylum.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  return phylums;
}

export async function getMinMaxPhylumValues(phylumId: number) {
  const min = await prisma.metagenomeProperty.aggregate({
    _min: {
      value: true,
    },
    where: {
      phylumId,
    },
  });
  const max = await prisma.metagenomeProperty.aggregate({
    _max: {
      value: true,
    },
    where: {
      phylumId,
    },
  });

  return {
    fromColor: GRADIENT_FROM,
    maxValue: max._max.value,
    minValue: min._min.value,
    phylumId,
    toColor: GRADIENT_TO,
  };
}
