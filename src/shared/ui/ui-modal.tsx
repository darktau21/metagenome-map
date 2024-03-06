'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  type MouseEventHandler,
  type PropsWithChildren,
  useEffect,
  useRef,
} from 'react';
import { createPortal } from 'react-dom';

type UIModalProps = Readonly<PropsWithChildren>;

export function UIModal({ children }: UIModalProps) {
  const router = useRouter();
  const bodyRef = useRef<HTMLDivElement>(null);

  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === bodyRef.current) {
      router.back();
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        router.back();
      }
    };

    window.addEventListener('keyup', handleEscape);

    return () => {
      window.removeEventListener('keyup', handleEscape);
    };
  });

  return createPortal(
    <motion.div
      animate={{
        height: '100dvh',
        left: 0,
        opacity: 1,
        top: 0,
        width: '100dvw',
      }}
      className="absolute opacity-0 backdrop-blur-md z-[1500] cursor-pointer p-10"
      initial={{
        height: 0,
        left: '33dvw',
        opacity: 0,
        top: '33dvh',
        width: 0,
      }}
      onClick={handleClick}
      ref={bodyRef}
    >
      <div className="h-full bg-slate-100 scrollbar-thin rounded-lg shadow-lg px-12 overflow-auto cursor-auto">
        {children}
      </div>
    </motion.div>,
    document.getElementById('modal-container')!,
  );
}
