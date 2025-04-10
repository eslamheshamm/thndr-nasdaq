import { Skeleton } from "./ui/skeleton";

export const SkeletonCard = () => (
	<li className="p-4 border rounded-xl shadow-sm h-full w-full">
		<Skeleton className="h-6 w-3/4 mb-2" />
		<Skeleton className="h-4 w-1/2" />
	</li>
);
