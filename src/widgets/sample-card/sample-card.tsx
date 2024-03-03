import type { Sample } from '@/entities/sample';

import {
  GroupedPropValueList,
  PropValueItem,
  PropValueList,
} from '@/entities/property';
import { UICard, UIHeading } from '@/shared/ui';

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
        value={selectionDate.toLocaleDateString()}
      />
      <UIHeading as="h2">Свойства</UIHeading>
      {groupedProperties ? (
        <GroupedPropValueList
          groupedProperties={groupedProperties}
          renderGroupName={(groupName) => <UIHeading>{groupName}</UIHeading>}
          renderGroupedProperties={(properties) => (
            <PropValueList
              props={properties}
              renderProp={({ name, value }) => (
                <PropValueItem name={name} value={value} />
              )}
            />
          )}
        />
      ) : // <PropValueList
      //   props={properties}
      //   renderProp={({ name, value }) => (
      //     <PropValueItem name={name} value={value} />
      //   )}
      // />
      null}
    </UICard>
  );
}
