'use client';

import { useEffect, useState, useTransition } from 'react';
import Skeleton from 'react-loading-skeleton';
import Select from 'react-select';

import type { Phylum } from '../types';

import { useSelectedPhylum } from '../model/use-selected-phylum';

type PhylumSearchInput = Readonly<{
  selectItems: Phylum[];
}>;

export function PhylumSearchInput({ selectItems }: PhylumSearchInput) {
  const [isLoading, startTransition] = useTransition();
  const [phylumId, setPhylumId] = useSelectedPhylum({ startTransition });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);
  return isMounted ? (
    <Select
      defaultValue={selectItems.find(({ value }) => value === phylumId)}
      isClearable
      isDisabled={isLoading}
      isSearchable
      noOptionsMessage={(input) => `Филум ${input.inputValue} не найден`}
      onChange={(value) => void setPhylumId(value?.value ?? 0)}
      options={selectItems}
      placeholder="Выберите филум"
    />
  ) : (
    <Skeleton height={'2rem'} />
  );
}
