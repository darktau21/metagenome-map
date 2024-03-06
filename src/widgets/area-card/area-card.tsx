import type { Area } from '@/entities/area';

import {
  GroupedPropValueList,
  PropValueItem,
  PropValueList,
} from '@/entities/property';
import { UIAccordion, UICard, UIHeading } from '@/shared/ui';

type AreaCardProps = Readonly<{
  area: Area;
}>;

export function AreaCard({ area }: AreaCardProps) {
  const { id, metagenomeId, properties: groupedProperties } = area;
  return (
    <UICard>
      <UIHeading>Территория #{id}</UIHeading>
      <UIHeading as="h2">Свойства</UIHeading>
      {groupedProperties ? (
        <GroupedPropValueList
          groupedProperties={groupedProperties}
          renderGroupedProperties={(groupName, properties) => (
            <UIAccordion title={<UIHeading as="h3">{groupName}</UIHeading>}>
              <PropValueList
                props={properties}
                renderProp={({ name, value }) => (
                  <PropValueItem name={name} value={value} />
                )}
              />
            </UIAccordion>
          )}
        />
      ) : null}
    </UICard>
  );
}
