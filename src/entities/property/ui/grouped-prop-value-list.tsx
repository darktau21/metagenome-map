import { Fragment, type ReactNode } from 'react';

import type { GroupedProperties, Property } from '../types';

type GroupedPropValueListProps = Readonly<{
  groupedProperties: GroupedProperties;
  renderGroupedProperties: (
    groupName: string,
    properties: Property[],
  ) => ReactNode;
}>;

export function GroupedPropValueList({
  groupedProperties,
  renderGroupedProperties,
}: GroupedPropValueListProps) {
  const groupedPropertiesTuples = Object.entries(groupedProperties);

  return (
    <div className="flex flex-col">
      {groupedPropertiesTuples.map(([groupName, properties]) => (
        <Fragment key={groupName}>
          {renderGroupedProperties(
            groupName === 'null' || !groupName ? 'Без группы' : groupName,
            properties,
          )}
        </Fragment>
      ))}
    </div>
  );
}
