'use server';

import type { LatLng } from '@/shared/types';
import type { Result } from '@prisma/client/runtime/library';

import {
  type FloatProperty,
  type StringProperty,
  convertProperties,
  getGradientMap,
  prisma,
} from '@/shared/lib';
import { type Prisma } from '@prisma/client';

import type { Area } from '../types';

const select = {
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
  metagenomeId: true,
  stringProperties: {
    select: {
      property: {
        select: {
          group: {
            select: { name: true },
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
} satisfies Prisma.AreaSelect;

function convertAreaData(area: {
  floatProperties: FloatProperty[];
  id: number;
  metagenomeId: null | number;
  stringProperties: StringProperty[];
}) {
  const { floatProperties, id, metagenomeId, stringProperties } = area;

  return {
    id,
    metagenomeId,
    properties: convertProperties([...floatProperties, ...stringProperties]),
  };
}

export async function getAreaCoordsWithPhylum(phylumId: number) {
  const areaCoords = await prisma.areaCoords.findManyWithPhylum(phylumId);
  const phylumValuesDistinct = await prisma.metagenomeProperty.findMany({
    distinct: ['value'],
    orderBy: {
      value: 'asc',
    },
    select: { id: true, value: true },
    where: { phylumId },
  });

  const gradient = getGradientMap(
    phylumValuesDistinct.map(({ value }) => value),
  );
  const convertedAreaCoords = areaCoords.map(({ polygon, value, ...data }) => ({
    ...data,
    fillColor: gradient[value],
    polygon: polygon.coordinates[0].map(([lng, lat]) => [lat, lng] as LatLng),
    value,
  }));
  return convertedAreaCoords;
}

export async function getAreaCoords() {
  const areaCoords = await prisma.areaCoords.findMany();
  const convertedAreaCoords = areaCoords.map(({ id, polygon }) => ({
    id,
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

export async function getDiagram(areaId: number) {
  const res = await prisma.diagram.findFirst({
    where: { metagenome: { areas: { some: { id: areaId } } } },
  });

  return res?.content ?? '';
}
