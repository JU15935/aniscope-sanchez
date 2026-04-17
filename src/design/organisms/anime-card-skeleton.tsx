import { Skeleton } from '@/design/atoms/skeleton';

export function AnimeCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-gray-700 bg-gray-800">
      <Skeleton className="h-52 w-full rounded-none" />
      <div className="flex flex-col gap-2 p-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
        <div className="flex gap-1">
          <Skeleton className="h-4 w-14 rounded-full" />
          <Skeleton className="h-4 w-16 rounded-full" />
        </div>
      </div>
    </div>
  );
}