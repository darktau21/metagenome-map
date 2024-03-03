import { AreaLoader } from '@/entities/area';
import { UICardSkeleton, UIHeading } from '@/shared/ui';
import { AreaCard } from '@/widgets/area-card';
import { Suspense } from 'react';

type AreaPageProps = Readonly<{
  params: Record<'id', string>;
}>;

export async function AreaPage({ params }: AreaPageProps) {
  const { id } = params;

  return (
    <Suspense fallback={<UICardSkeleton />}>
      <AreaLoader id={+id}>
        {(area, duplicates) => (
          <>
            <AreaCard area={area} />
            {duplicates ? (
              <>
                <UIHeading as="h2" classNames="col-start-2 col-end-6">
                  Территории с совпадающими координатами
                </UIHeading>
                {duplicates.map((area) => (
                  <AreaCard area={area} key={area.id} />
                ))}
              </>
            ) : null}
          </>
        )}
      </AreaLoader>
    </Suspense>
  );
}