import { UITable, UITableCell, UITableRow } from '@/shared/ui';

import type { MetagenomeValue } from '../types';

type MetagenomeTableProps = Readonly<{
  properties: MetagenomeValue[];
}>;

export function MetagenomeTable({ properties }: MetagenomeTableProps) {
  return (
    <UITable
      heading={
        <UITableRow>
          <UITableCell>Филум</UITableCell>
          <UITableCell>Значение</UITableCell>
        </UITableRow>
      }
    >
      {properties.map(({ name, value }, i) => (
        <UITableRow key={i}>
          <UITableCell>{name}</UITableCell>
          <UITableCell>{value}</UITableCell>
        </UITableRow>
      ))}
    </UITable>
  );
}
