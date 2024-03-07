import clsx from 'clsx';
import { type ChangeEventHandler, forwardRef } from 'react';

type UIInputProps = Readonly<{
  className?: string;
  onChange: ChangeEventHandler;
  placeholder: string;
  value: string;
}>;

export const UIInput = forwardRef<HTMLInputElement, UIInputProps>(
  function UIInput({ className, onChange, placeholder, value }, inputRef) {
    return (
      <input
        className={clsx(
          'w-full px-4 py-2 rounded border border-gray-900',
          className,
        )}
        onChange={onChange}
        placeholder={placeholder}
        ref={inputRef}
        value={value}
      />
    );
  },
);
