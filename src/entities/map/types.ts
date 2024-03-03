import type { LatLng } from '@/shared/types';

export type AreaMapView = {
  id: number;
  polygon: LatLng[];
};

export type SampleMapView = {
  id: number;
  point: LatLng;
};
