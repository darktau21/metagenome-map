import { parseAsInteger, useQueryState } from 'nuqs';

import { PHYLUM_ID_QUERY_NAME } from '../constants';

export function useSelectedPhylum() {
  return useQueryState(
    PHYLUM_ID_QUERY_NAME,
    parseAsInteger
      .withDefault(0)
      .withOptions({ clearOnDefault: true, shallow: false }),
  );
}
