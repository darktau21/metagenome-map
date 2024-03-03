import type { ReactNode } from 'react';

import type { GroupedProperties, Property } from '../types';

type GroupedPropValueListProps = Readonly<{
  groupedProperties: GroupedProperties;
  renderGroupName: (groupName: string) => ReactNode;
  renderGroupedProperties: (properties: Property[]) => ReactNode;
}>;

export function GroupedPropValueList({
  groupedProperties,
  renderGroupName,
  renderGroupedProperties,
}: GroupedPropValueListProps) {
  const groupedPropertiesTuples = Object.entries(groupedProperties);
  return (
    <div className="flex flex-col">
      {groupedPropertiesTuples.map(([groupName, properties]) => (
        <>
          {renderGroupName(
            groupName === 'null' || !groupName ? 'Без группы' : groupName,
          )}
          {renderGroupedProperties(properties)}
        </>
      ))}
    </div>
  );
}
