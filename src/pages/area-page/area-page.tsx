import { AreaLoader, areaActions } from '@/entities/area';
import { PropValueList } from '@/entities/property/ui/prop-value-list';
import { UICardSkeleton, UIHeading, UIList } from '@/shared/ui';
import { AreaCard } from '@/widgets/area-card';
import { Suspense } from 'react';

type AreaPageProps = {
  params: Record<'id', string>;
};

export function AreaPage({ params }: AreaPageProps) {
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
