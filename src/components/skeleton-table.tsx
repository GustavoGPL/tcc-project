import { Skeleton } from './ui/skeleton';

export function SkeletonTable() {
	return (
		<div className="flex flex-col space-y-3 w-full">
			<Skeleton className="h-[30vh] w-full rounded-xl" />
		</div>
	);
}
