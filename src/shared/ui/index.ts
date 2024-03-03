import dynamic from 'next/dynamic';

export { UIAside as UIVerticalMenu } from './ui-aside';
export { UICard } from './ui-card';
export { UICardSkeleton } from './ui-card-skeleton';
export { UIHeading } from './ui-heading';
export { UILayout } from './ui-layout';
export { UIList } from './ui-list';
export { UIListItem } from './ui-list';
// export { UIMapContainer } from './ui-map-container';
export { UIMarker } from './ui-marker';
export { UIModal } from './ui-modal';
export { UINavLink } from './ui-nav-link';
export { UINavMenuItem } from './ui-nav-menu';
export { UINavMenu } from './ui-nav-menu';
export const UIMapContainer = dynamic(() => import('./ui-map-container'), {
  ssr: false,
});

export { UISpinnerIcon } from './ui-spinner-icon';
