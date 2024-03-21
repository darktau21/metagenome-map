import dynamic from 'next/dynamic';

export * from './model/actions';
export { MetagenomeLoader } from './model/metagenome-loader';
export { MinMaxPhylumLoader } from './model/min-max-phylum-loader';
export { PhylumListLoader } from './model/phylum-list-loader';
export { MetagenomeTable } from './ui/metagenome-table';
export { PhylumIndicator } from './ui/phylum-indicator';

export const Diagram = dynamic(() => import('./ui/diagram'), { ssr: false });
