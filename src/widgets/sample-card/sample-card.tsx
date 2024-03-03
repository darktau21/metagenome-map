import type { Area } from '@/entities/area/types';

import { PropValueItem, PropValueList } from '@/entities/property';
import { UICard, UIHeading } from '@/shared/ui';

type AreaCardProps = Readonly<{
  area: Area;
}>;

export function SampleCard({ area }: AreaCardProps) {
  const { id, metagenomeId, properties } = area;
  return (
    <UICard>
      <UIHeading>Территория #{id}</UIHeading>
      <UIHeading as="h2">Свойства</UIHeading>
      {properties ? (
        <PropValueList
          props={properties}
          renderProp={({ name, value }) => (
            <PropValueItem name={name} value={value} />
          )}
        />
      ) : null}
    </UICard>
  );
}
