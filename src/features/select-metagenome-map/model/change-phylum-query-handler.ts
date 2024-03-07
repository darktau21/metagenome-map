import type { Phylum } from '@prisma/client';
import type { Dispatch, SetStateAction } from 'react';

import { searchPhylum } from '@/entities/metagenome';
import debounce from 'debounce';

import {
  INPUT_DEBOUNCE_TIME,
  MIN_LOADER_SCREEN_TIME,
  SHOW_LOADER_AFTER_TIME,
} from '../constants';

export const changePhylumQueryHandler = debounce(
  async (
    input: string,
    setFn: Dispatch<SetStateAction<Phylum[]>>,
    setLoadingState: Dispatch<SetStateAction<boolean>>,
  ) => {
    const timer = new Promise((res) =>
      setTimeout(() => void res(false), SHOW_LOADER_AFTER_TIME),
    );
    const loader = searchPhylum(input).then((res) => {
      setFn(res);
      return true;
    });

    const isLoaded = await Promise.race([timer, loader]);

    if (!isLoaded) {
      setLoadingState(true);
      const deferLoader = new Promise((res) =>
        setTimeout(res, MIN_LOADER_SCREEN_TIME),
      );
      await Promise.all([loader, deferLoader]);
      setLoadingState(false);
    }
  },
  INPUT_DEBOUNCE_TIME,
);
