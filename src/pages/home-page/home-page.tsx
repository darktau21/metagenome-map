import { prisma } from '@/shared/lib';
import { MapWidget } from '@/widgets/map';

export async function HomePage() {
  const areas = await prisma.areaCoords.findMany();
  const convertedAreas = areas.map((area) => ({
    id: area.id,
    polygon: area.polygon.coordinates[0].map(([lng, lat]) => [lat, lng]),
  }));

  return <MapWidget areas={convertedAreas} />;
}
