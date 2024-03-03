import { UISpinnerIcon } from '@/shared/ui';

export function LoadingPage() {
  return (
    <div className="h-dvh flex justify-center items-center col-span-full">
      <UISpinnerIcon className="w-20 h-20" />
    </div>
  );
}
