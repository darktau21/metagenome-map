import type { Area } from '@/entities/area/types';

import { PropValueList } from '@/entities/property';
import { PropValueItem } from '@/entities/property/ui/prop-value-item';
import { UICard, UIHeading } from '@/shared/ui';

type AreaCardProps = Readonly<{
  area: Area;
}>;

export function AreaCard({ area }: AreaCardProps) {
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
