'use client';

import { type ChangeEventHandler, useTransition } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import type { Phylum } from '../types';

import { useSelectedPhylum } from '../model/use-selected-phylum';

type PhylumSearchInput = Readonly<{
  selectItems: Phylum[];
}>;

export function PhylumSearchInput({ selectItems }: PhylumSearchInput) {
  const [isLoading, startTransition] = useTransition();
  const [phylumId, setPhylumId] = useSelectedPhylum({ startTransition });

  return (
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
  );
}
