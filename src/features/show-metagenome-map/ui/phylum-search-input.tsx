'use client';

import { searchPhylum } from '@/entities/metagenome';
import { UISearchInput } from '@/shared/ui';
import debounce from 'debounce';
import {
  type ChangeEventHandler,
  type Dispatch,
  type MouseEventHandler,
  type SetStateAction,
  startTransition,
  useCallback,
  useDeferredValue,
  useEffect,
  useState,
} from 'react';

const handleChange = debounce(
  async (input: string, setFn: Dispatch<SetStateAction<string[]>>) => {
    const phylums = await searchPhylum(input);
    startTransition(() => setFn(phylums.map(({ name }) => name)));
  },
  500,
);

export function PhylumSearchInput() {
  const [phylumList, setPhylumList] = useState<string[]>([]);
  const [phylumQuery, setPhylumQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    handleChange(phylumQuery, setPhylumList)?.finally(() =>
      setIsLoading(false),
    );
  }, [phylumQuery]);

  const handleTipClick: MouseEventHandler<HTMLLIElement> = useCallback(
    (e) => setPhylumQuery(e.currentTarget.innerText),
    [],
  );

  return (
    <UISearchInput
      isLoading={isLoading}
      onInputChange={(e) => setPhylumQuery(e.currentTarget.value)}
      onTipClick={handleTipClick}
      placeholder="Название филума"
      tips={phylumList}
      value={phylumQuery}
    />
  );
}
