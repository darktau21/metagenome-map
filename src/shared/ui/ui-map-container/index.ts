import dynamic from 'next/dynamic';

export { UIMapSkeleton } from './ui-map-skeleton';
export const UIMapContainer = dynamic(() => import('./ui-map-container'), {
  ssr: false,
});
