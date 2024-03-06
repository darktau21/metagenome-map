'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  type ChangeEventHandler,
  type MouseEventHandler,
  memo,
  useEffect,
  useRef,
  useState,
} from 'react';

type UISearchInputProps = Readonly<{
  action: (data: FormData) => void;
  onInputChange: ChangeEventHandler<HTMLInputElement>;
  onTipClick: MouseEventHandler<HTMLLIElement>;
  placeholder: string;
  tips: string[];
  value: string;
}>;

export const UISearchInput = memo(function UISearchInput({
  action,
  onInputChange,
  onTipClick,
  placeholder,
  tips,
  value,
}: UISearchInputProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const tipsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleKeyboardNavigation = (e: KeyboardEvent) => {
      e.stopPropagation();
      if (e.code === 'Escape') {
        const activeElement = document.activeElement as HTMLElement;
        activeElement?.blur();
      }
      if (
        document.activeElement === inputRef.current &&
        e.code === 'ArrowDown'
      ) {
        const firstListItem = tipsRef.current
          ?.firstElementChild as HTMLLIElement;
        firstListItem?.focus();

        return;
      }

      if (document.activeElement?.parentElement === tipsRef.current) {
        switch (e.code) {
          case 'ArrowDown':
            const nextListItem = document.activeElement
              .nextElementSibling as HTMLLIElement;
            nextListItem?.focus();

            return;
          case 'ArrowUp':
            if (e.ctrlKey) {
              inputRef.current?.focus();
            }

            const prevListItem = document.activeElement
              .previousElementSibling as HTMLLIElement;

            if (!prevListItem) {
              inputRef.current?.focus();
            }
            prevListItem?.focus();
            return;
          case 'Enter':
            const currentElement = document.activeElement as HTMLLIElement;
            currentElement?.click();
            inputRef.current?.focus();
            return;
        }
      }
    };

    document.addEventListener('keydown', handleKeyboardNavigation);

    return () =>
      document.removeEventListener('keydown', handleKeyboardNavigation);
  }, []);

  return (
    <form
      action={action}
      className="relative"
      onBlur={() => setIsFocused(false)}
      onFocus={() => setIsFocused(true)}
    >
      <input
        className="w-full px-4 py-2 rounded border border-gray-900"
        onChange={onInputChange}
        placeholder={placeholder}
        ref={inputRef}
        value={value}
      />
      <AnimatePresence>
        {isFocused ? (
          <motion.div
            animate={{ height: 'auto', maxHeight: '11rem', opacity: 1 }}
            className="absolute overflow-hidden max-h-44 bg-white shadow-lg w-full top-full left-0 rounded"
            exit={{ height: 0, opacity: 0 }}
            initial={{ height: 0, opacity: 0 }}
          >
            <ul
              className="flex flex-col max-h-full scrollbar-thin divide-y-2 overflow-x-hidden cursor-pointer overflow-y-auto"
              ref={tipsRef}
            >
              {value && !tips.length ? (
                <motion.li
                  className="px-4 py-2 outline-none max-w-full hover:bg-slate-200 focus-visible:bg-slate-200 transition-colors"
                  initial={{ opacity: 0 }}
                  onClick={onTipClick}
                  tabIndex={-1}
                  viewport={{ margin: '30%' }}
                  whileFocus={{
                    scale: 1.05,
                  }}
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileInView={{
                    opacity: 1,
                  }}
                >
                  Нет результатов
                </motion.li>
              ) : null}{' '}
              {tips.length > 1 || (tips.length === 1 && tips[0] !== value)
                ? tips.map((tip) => (
                    <motion.li
                      className="px-4 py-2 outline-none max-w-full origin-center hover:bg-slate-200 focus-visible:bg-slate-200 transition-colors"
                      initial={{ opacity: 0 }}
                      key={tip}
                      onClick={onTipClick}
                      tabIndex={-1}
                      viewport={{ margin: '30%' }}
                      whileFocus={{
                        scale: 1.05,
                      }}
                      whileHover={{
                        scale: 1.05,
                      }}
                      whileInView={{
                        opacity: 1,
                      }}
                    >
                      {tip}
                    </motion.li>
                  ))
                : null}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </form>
  );
});
