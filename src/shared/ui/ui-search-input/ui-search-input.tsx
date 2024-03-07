'use client';

import {
  type ChangeEventHandler,
  type FormEventHandler,
  type MouseEventHandler,
  memo,
  useEffect,
  useRef,
  useState,
} from 'react';
import Skeleton from 'react-loading-skeleton';

import { UIInput } from '../ui-input';
import { handleKeyboardNavigation } from './handle-keyboard-navigation';
import { SearchStates } from './types';
import { UIArrow } from './ui-arrow';
import { UITipsItem } from './ui-tips-item';
import { UITipsList } from './ui-tips-list';

type UISearchInputProps<T> = Readonly<{
  isLoading: boolean;
  notFoundTooltipText: string;
  onInputChange: ChangeEventHandler<HTMLInputElement>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onTipClick: MouseEventHandler<HTMLLIElement>;
  placeholder: string;
  resultsFoundTooltipText: string;
  selectedTooltipText: string;
  tips: string[];
  value: string;
}>;

export const UISearchInput = memo(function UISearchInput<T>({
  isLoading = true,
  notFoundTooltipText,
  onInputChange,
  onSubmit,
  onTipClick,
  placeholder,
  resultsFoundTooltipText,
  selectedTooltipText,
  tips,
  value,
}: UISearchInputProps<T>) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const tipsRef = useRef<HTMLUListElement>(null);

  let searchState: SearchStates = SearchStates.SELECTED;

  if (value && !tips.length) searchState = SearchStates.NOT_FOUND;
  if (tips.length > 1 || (tips.length === 1 && tips[0] !== value))
    searchState = SearchStates.RESULTS_FOUND;

  useEffect(() => {
    const handler = handleKeyboardNavigation(inputRef, tipsRef);
    document.addEventListener('keydown', handler);

    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <div
      className="relative"
      onBlur={() => setIsFocused(false)}
      onClick={(e) => console.log(e.target)}
      onFocus={() => setIsFocused(true)}
    >
      <form className="relative h-full block" onSubmit={onSubmit}>
        <UIInput
          className="pr-12"
          onChange={onInputChange}
          placeholder={placeholder}
          ref={inputRef}
          value={value}
        />
        <UIArrow
          notFoundTooltipText={notFoundTooltipText}
          resultsFoundTooltipText={resultsFoundTooltipText}
          selectedTooltipText={selectedTooltipText}
          status={searchState}
        />
      </form>
      <UITipsList
        isLoading={isLoading}
        isShown={isFocused}
        loadingPlaceholder={<Skeleton count={4} wrapper={UITipsItem} />}
        notFoundPlaceholder={<UITipsItem>Нет результатов</UITipsItem>}
        ref={tipsRef}
        searchState={searchState}
      >
        {tips.map((tip) => (
          <UITipsItem key={tip} onClick={onTipClick}>
            {tip}
          </UITipsItem>
        ))}
      </UITipsList>
    </div>
  );
});
