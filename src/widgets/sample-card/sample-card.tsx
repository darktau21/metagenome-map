import type { Sample } from '@/entities/sample';

import {
  GroupedPropValueList,
  PropValueItem,
  PropValueList,
} from '@/entities/property';
import { UIAccordion, UICard, UIHeading } from '@/shared/ui';

type SampleCardProps = Readonly<{
  sample: Sample;
}>;

export function SampleCard({ sample }: SampleCardProps) {
  const { id, name, properties: groupedProperties, selectionDate } = sample;

  return (
    <UICard>
      <UIHeading>Образец #{id}</UIHeading>
      <PropValueItem name={'Имя'} value={name} />
      <PropValueItem
        name={'Дата выборки'}
        value={selectionDate.toLocaleDateString('ru')}
      />
      <UIHeading as="h2">Свойства</UIHeading>
      {groupedProperties ? (
        <GroupedPropValueList
          groupedProperties={groupedProperties}
          renderGroupedProperties={(groupName, properties) => (
            <UIAccordion title={<UIHeading as="h3">{groupName}</UIHeading>}>
              <PropValueList
                props={properties}
                renderProp={({ name, units, value }) => (
                  <PropValueItem
                    name={name}
                    value={`${value} ${units ?? ''}`}
                  />
                )}
              />
            </UIAccordion>
          )}
        />
      ) : null}
    </UICard>
  );
}
