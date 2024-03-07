import type { LatLng } from '@/shared/types';

export type AreaMapView = {
  fillColor?: string;
  id: number;
  polygon: LatLng[];
  value?: number;
};

export type SampleMapView = {
  id: number;
  point: LatLng;
};
