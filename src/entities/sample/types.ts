import type { LatLng } from '@/shared/types';

export type SampleProp = {
  name: string;
  units?: null | string;
  value: number | string;
};

export type SamplePropGroups = Record<string, SampleProp[]>;

export type SampleCoords = {
  id: number;
  point: LatLng;
};

export type Sample = {
  id: number;
  name: string;
  properties: SamplePropGroups;
  selectionDate: Date;
};
