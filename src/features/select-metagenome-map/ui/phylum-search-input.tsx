'use client';

import type { Phylum } from '@prisma/client';

import { createQueryString } from '@/shared/lib/react';
import { UISearchInput } from '@/shared/ui';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  type ChangeEventHandler,
  type FormEventHandler,
  type MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { PHYLUM_ID_QUERY_NAME } from '../constants';
import { changePhylumQueryHandler } from '../model/change-phylum-query-handler';

export function PhylumSearchInput() {
  const [phylumList, setPhylumList] = useState<Phylum[]>([]);
  const [phylumQuery, setPhylumQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    changePhylumQueryHandler(phylumQuery, setPhylumList, setIsLoading);
  }, [phylumQuery]);

  const handleInput: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setPhylumQuery(e.currentTarget.value);
  }, []);

  const handleTipClick: MouseEventHandler<HTMLLIElement> = useCallback((e) => {
    console.log('click', e.currentTarget);
    setPhylumQuery(e.currentTarget.textContent ?? '');
  }, []);

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();

      if (phylumList.length === 1 && phylumList[0].name === phylumQuery) {
        const phylumPath = createQueryString(
          PHYLUM_ID_QUERY_NAME,
          String(phylumList[0].id),
          searchParams.toString(),
        );
        router.push(`${pathname}?${phylumPath}`);
      }
    },
    [phylumQuery, pathname, phylumList, router, searchParams],
  );
  return (
    <UISearchInput
      isLoading={isLoading}
      notFoundTooltipText="Филум с таким названием не найден"
      onInputChange={handleInput}
      onSubmit={handleSubmit}
      onTipClick={handleTipClick}
      placeholder="Название филума"
      resultsFoundTooltipText="Выберите филум"
      selectedTooltipText="Нажмите, чтобы отобразить на карте"
      tips={phylumList.map(({ name }) => name)}
      value={phylumQuery}
    />
  );
}
