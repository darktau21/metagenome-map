import type { ReactNode } from 'react';

import { UIList, UIListItem } from '@/shared/ui';

import type { Property } from '../types';

type PropValueListProps = Readonly<{
  props: Property[];
  renderProp: (prop: Property) => ReactNode;
}>;

export function PropValueList({ props, renderProp }: PropValueListProps) {
  return (
    <UIList>
      {props.map((prop) => (
        <UIListItem key={prop.name}>{renderProp(prop)}</UIListItem>
      ))}
    </UIList>
  );
}
