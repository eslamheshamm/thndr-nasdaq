import { Stock } from "../lib/types";
import StockCard from "./StockCard";
import { Skeleton } from "./ui/skeleton";

const SkeletonCard = () => (
	<li className="p-4 border rounded-xl shadow-sm h-full w-full">
		<Skeleton className="h-6 w-3/4 mb-2" />
		<Skeleton className="h-4 w-1/2" />
	</li>
);

const StockList = ({
	isLoading,
	data,
	isFetchingNextPage,
	isError,
	error,
}: {
	isLoading: boolean;
	data: Stock[];
	isFetchingNextPage: boolean;
	isError: boolean;
	error: Error;
	debouncedSearch: string;
}) => {
	return (
		<section
			className="flex flex-col gap-4"
			aria-live={isLoading ? "polite" : "off"}
			aria-busy={isLoading}
		>
			{isLoading ? (
				<ul
					className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 grid-flow-row auto-rows-fr"
					aria-hidden="true"
				>
					{Array.from({ length: 12 }).map((_, index) => (
						<SkeletonCard key={`loading-${index}`} />
					))}
				</ul>
			) : data?.length > 0 ? (
				<ul
					className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 grid-flow-row auto-rows-fr"
					role="list"
					aria-label="Stock search results"
				>
					{data.map((stock: Stock) => (
						<StockCard key={stock.ticker + stock.name} stock={stock} />
					))}
				</ul>
			) : null}
			{isError && (
				<p className="text-center py-8 text-red-500 font-bold">
					{error.message || "An error occurred while fetching stocks."}
				</p>
			)}
			{isFetchingNextPage && !isError && (
				<div aria-live="polite">
					<ul
						className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 grid-flow-row auto-rows-fr"
						aria-hidden="true"
					>
						{Array.from({ length: 8 }).map((_, index) => (
							<SkeletonCard key={`next-${index}`} />
						))}
					</ul>
				</div>
			)}
		</section>
	);
};

export default StockList;
