import { createSearchParamsCache, parseAsInteger } from 'nuqs/server';

import { PHYLUM_ID_QUERY_NAME } from '../constants';

export const parsePhylum = createSearchParamsCache({
  [PHYLUM_ID_QUERY_NAME]: parseAsInteger.withDefault(0),
});
