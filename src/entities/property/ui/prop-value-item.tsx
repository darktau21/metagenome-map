import type { Property } from '../types';

type PropValueItem = Readonly<Property>;

export function PropValueItem({ name, value }: PropValueItem) {
  return (
    <p className="flex items-center gap-1">
      <span className="font-semibold text-slate-500">{name}:</span>
      <span className="text-lg font-medium">{value}</span>
    </p>
  );
}
