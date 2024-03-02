import type { LatLng } from '@/shared/types';

export type AreaCoords = {
  id: number;
  polygon: LatLng[];
};

export type AreaProp = {
  name: string;
  value: number | string;
};

export type Area = {
  id: number;
  metagenomeId: null | number;
  properties: AreaProp[];
};
