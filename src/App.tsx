import { useEffect } from "react";
import { Input } from "./components/ui/input";
import useStockStore from "./lib/store";
import { fetchStocks } from "./lib/api";
import { useDebounceValue } from "./lib/hooks/useDebounceValue";

function App() {
	const { stocks, setStocks, searchQuery, setSearchQuery } = useStockStore();
	const [debouncedSearch] = useDebounceValue(searchQuery, 500);

	useEffect(() => {
		const loadStocks = async () => {
			try {
				const data = await fetchStocks(debouncedSearch);
				if (data.message) {
					setStocks([]);
				} else {
					setStocks(data.results);
				}
			} catch (error) {
				console.error("Failed to load stocks:", error);
			}
		};
		loadStocks();
	}, [debouncedSearch, setStocks]);

	return (
		<main className="min-h-screen bg-gray-100 p-10">
			<section className="flex flex-col md:flex-row gap-4 w-full max-w-2xl p-4 mx-auto">
				<h1 className="text-2xl font-bold text-center md:text-left">Search</h1>
				<Input
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="w-full"
				/>
			</section>

			<ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 py-20">
				{stocks.map((stock) => (
					<li
						key={stock.ticker + stock.name}
						className="p-4 border rounded-xl shadow-md"
					>
						<h2 className=" font-semibold">{stock.name}</h2>
						<p className="text-sm text-gray-500">{stock.ticker}</p>
					</li>
				))}
			</ul>
		</main>
	);
}

export default App;
