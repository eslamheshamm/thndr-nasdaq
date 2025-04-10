import { Stock } from "../lib/types";

const StockCard = ({ stock }: { stock: Stock }) => (
	<li className="p-4 border rounded-xl shadow-sm h-full w-full ">
		<h2 id={`stock-name-${stock.ticker}`} className="font-semibold">
			{stock.name}
		</h2>
		<p
			className="text-sm text-gray-500"
			aria-label={`Ticker symbol: ${stock.ticker}`}
		>
			{stock.ticker}
		</p>
	</li>
);

export default StockCard;
