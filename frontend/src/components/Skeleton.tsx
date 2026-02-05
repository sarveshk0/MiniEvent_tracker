export default function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-md bg-gray-200 ${className}`} />
  );
}

export function EventCardSkeleton() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
      <div className="flex justify-between items-start">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-5 w-20" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <div className="pt-4 flex gap-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  );
}
