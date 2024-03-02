'use server';

import type { LatLng } from '@/shared/types';
import type { Result } from '@prisma/client/runtime/library';

import { prisma } from '@/shared/lib';
import { type Prisma } from '@prisma/client';

import type { Area } from '../types';

const select = {
  floatProperties: {
    select: {
      property: {
        select: {
          name: true,
        },
      },
      value: true,
    },
  },
  id: true,
  metagenomeId: true,
  stringProperties: {
    select: {
      property: {
        select: {
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
} satisfies Prisma.AreaSelect;

function convertAreaData(area: {
  floatProperties: {
    property: {
      name: string;
    };
    value: number;
  }[];
  id: number;
  metagenomeId: null | number;
  stringProperties: {
    property: {
      name: string;
    };
    value: {
      value: string;
    };
  }[];
}) {
  const { floatProperties, id, metagenomeId, stringProperties } = area;

  const convertedFloatProperties = floatProperties.map(
    ({ property, value }) => ({ name: property.name, value }),
  );
  const convertedStringProperties = stringProperties.map(
    ({ property, value }) => ({ name: property.name, value: value.value }),
  );

  return {
    id,
    metagenomeId,
    properties: [...convertedFloatProperties, ...convertedStringProperties],
  };
}

export async function getAreaCoords() {
  const areaCoords = await prisma.areaCoords.findMany();
  const convertedAreaCoords = areaCoords.map(({ id, polygon }) => ({
    id: id,
    polygon: polygon.coordinates[0].map(([lng, lat]) => [lat, lng] as LatLng),
  }));

  return convertedAreaCoords;
}

export async function getAreas({
  skip,
  take,
}: {
  skip?: number;
  take?: number;
}) {
  const areas = await prisma.area.findMany({ select, skip, take });

  return areas.map(convertAreaData);
}

export async function getArea(id: number) {
  const area = await prisma.area.findFirst({
    select,
    where: {
      id,
    },
  });

  if (!area) {
    return null;
  }

  return convertAreaData(area);
}

export async function getDuplicatedCoordsArea(
  id: number,
): Promise<Area[] | null> {
  const areas = (await prisma.area.findEqualCoords(id, {
    select,
  })) as unknown as Result<
    typeof prisma.area,
    { select: typeof select },
    'findMany'
  >;

  if (!areas || !areas.length) {
    return null;
  }

  return areas.map(convertAreaData);
}
