'use server';

import { prisma } from '@/shared/lib';

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

export async function getMetagenome(id: number) {
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
