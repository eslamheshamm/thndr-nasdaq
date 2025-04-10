import { Stock } from "../lib/types";
import StockCard from "./StockCard";
import { SkeletonCard } from "./SkeletonCard";

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
			{isError && (
				<p className="text-center py-4 text-red-500 font-bold">
					{error.message || "An error occurred while fetching stocks."}
				</p>
			)}
		</section>
	);
};

export default StockList;
