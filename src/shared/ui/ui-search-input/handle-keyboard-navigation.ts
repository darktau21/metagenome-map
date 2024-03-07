import type { KeyboardEventHandler, RefObject } from 'react';

export const handleKeyboardNavigation = (
  input: RefObject<HTMLInputElement>,
  tips: RefObject<HTMLUListElement>,
): KeyboardEventHandler<HTMLDivElement> => {
  const isTipsSelectorFocused = () =>
    document.activeElement?.parentElement === tips.current;
  const isInputFocused = () => document.activeElement === input.current;

  const blurTipsList = () => {
    const activeElement = document.activeElement as HTMLElement;
    activeElement?.blur();
  };
  const focusNextElement = () => {
    if (isTipsSelectorFocused()) {
      const nextListItem = document.activeElement
        ?.nextElementSibling as HTMLLIElement;
      nextListItem?.focus();
    }
    if (isInputFocused()) {
      const firstTipsItem = tips.current?.firstElementChild as HTMLLIElement;
      firstTipsItem?.focus();
    }
  };
  const focusPrevElement = () => {
    if (isTipsSelectorFocused()) {
      const prevListItem = document.activeElement
        ?.previousElementSibling as HTMLLIElement;
      if (!prevListItem) {
        input.current?.focus();
      }
      prevListItem?.focus();
    }
  };
  const simulateListItemClick = () => {
    if (isTipsSelectorFocused()) {
      const focusedElement = document.activeElement as HTMLLIElement;
      focusedElement?.click();
      input.current?.focus();
    }
  };

  return (e) => {
    e.stopPropagation();
    switch (e.code) {
      case 'ArrowDown':
        focusNextElement();
        return;
      case 'ArrowUp':
        focusPrevElement();
        return;
      case 'Enter':
        simulateListItemClick();
        return;
      case 'Escape':
        blurTipsList();
        return;
    }
  };
};
