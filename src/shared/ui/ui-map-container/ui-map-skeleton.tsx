import Skeleton from 'react-loading-skeleton';

export function UIMapSkeleton() {
  return (
    <Skeleton
      baseColor="#e2e2e2"
      borderRadius={0}
      className="w-full h-full"
      containerClassName="self-stretch h-dvh col-span-full"
    />
  );
}
