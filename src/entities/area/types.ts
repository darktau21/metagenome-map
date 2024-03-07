import type { LatLng } from '@/shared/types';

export type AreaProp = {
  name: string;
  units?: null | string;
  value: number | string;
};

export type AreaPropGroups = Record<string, AreaProp[]>;

export type AreaCoords = {
  fillColor?: string;
  id: number;
  phylumId?: number;
  polygon: LatLng[];
  value?: number;
};

export type Area = {
  id: number;
  metagenomeId: null | number;
  properties: AreaPropGroups;
};
