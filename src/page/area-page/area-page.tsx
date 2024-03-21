import { AreaLoader } from '@/entities/area';
import { Diagram, MetagenomeTable, getMetagenome } from '@/entities/metagenome';
import { MetagenomeLoader } from '@/entities/metagenome';
import { UIAccordion, UICardSkeleton, UIHeading } from '@/shared/ui';
import { AreaCard } from '@/widgets/area-card';
import { Suspense } from 'react';

type AreaPageProps = Readonly<{
  params: Record<'id', string>;
}>;

export async function AreaPage({ params }: AreaPageProps) {
  const { id } = params;

  return (
    <Suspense fallback={<UICardSkeleton />}>
      <MetagenomeLoader areaId={+id}>
        {(properties) => (
          <AreaLoader id={+id}>
            {(area, duplicates) => (
              <div className="col-start-2 col-end-6">
                <AreaCard area={area}>
                  <UIAccordion title={<UIHeading as="h3">Метагеном</UIHeading>}>
                    <MetagenomeTable properties={properties} />
                  </UIAccordion>
                  <UIAccordion title={<UIHeading as="h3">Диаграмма</UIHeading>}>
                    <Diagram areaId={+id} />
                  </UIAccordion>
                </AreaCard>
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
              </div>
            )}
          </AreaLoader>
        )}
      </MetagenomeLoader>
    </Suspense>
  );
}
