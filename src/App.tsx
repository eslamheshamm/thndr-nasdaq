import { useEffect, useState } from "react";
import { Input } from "./components/ui/input";
import { fetchStocks } from "./lib/api";
import { useDebounceValue } from "./lib/hooks/useDebounceValue";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import StockList from "./components/StockList";
import GoTopButton from "./components/GoTopButton";
function App() {
	const [searchQuery, setSearchQuery] = useState("");
	const [debouncedSearch] = useDebounceValue(searchQuery, 500);
	const { ref, inView } = useInView();

	const { data, fetchNextPage, isLoading, isFetchingNextPage, isError, error } =
		useInfiniteQuery({
			queryKey: ["stocks", debouncedSearch],
			queryFn: ({ pageParam = 0 }) => fetchStocks(debouncedSearch, pageParam),
			getNextPageParam: (lastPage) =>
				lastPage.success && lastPage.results.length > 0
					? lastPage.results.length
					: null,
			initialPageParam: 20,
			// Custom retry logic to prevent retries for rate limiting
			retry: (failureCount, error) => {
				if (
					error instanceof Error &&
					error.message.includes("Rate limit exceeded")
				) {
					return false;
				}
				return failureCount < 1;
			},
		});

	useEffect(() => {
		if (inView) {
			fetchNextPage();
		}
	}, [fetchNextPage, inView]);

	const stocks = data?.pages
		? data.pages.flatMap((page) => page.results || [])
		: [];

	return (
		<>
			<header className=" max-w-screen-lg mx-auto my-8 px-4 flex flex-col">
				<h1 className="text-xl flex-shrink-0 mb-4">Search Stocks</h1>
				<div className="flex items-center gap-2">
					<Input
						id="stock-search"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="w-full"
						placeholder="Search for stocks by name or ticker"
						aria-describedby="search-description"
					/>
				</div>
			</header>
			<main className="min-h-screen max-w-screen-lg mx-auto mb-8 px-4 flex flex-col gap-8">
				<StockList
					isLoading={isLoading}
					data={stocks}
					isFetchingNextPage={isFetchingNextPage}
					isError={isError}
					debouncedSearch={debouncedSearch}
					error={error as Error}
				/>
			</main>
			<div className="mt-4 h-4" ref={ref}></div>

			<footer className="text-center py-4">
				<p>
					Made with ❤️ by{" "}
					<a
						href="https://github.com/eslamheshamm"
						target="_blank"
						rel="noopener noreferrer"
					>
						Eslam Hesham
					</a>
				</p>
			</footer>
			<GoTopButton />
		</>
	);
}

export default App;
