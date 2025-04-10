import { Stock } from "./types";

const API_KEY = "oVpIGbj9Roor_zdyG0tXc1cmFMOtkX7h";
const BASE_URL = "https://api.polygon.io/v3/reference/tickers";

export const fetchStocks = async (searchQuery = "", limit = 20) => {
	try {
		const response = await fetch(
			`${BASE_URL}?apiKey=${API_KEY}&search=${searchQuery}&limit=${limit}`
		);

		const data = await response.json();

		if (response.status === 429) {
			return {
				results: [],
				message: "Rate limit exceeded",
				success: false,
			};
		}
		if (!response.ok) {
			return {
				results: [],
				message: "Network response was not ok",
				success: false,
			};
		}
		if (data.results.length === 0) {
			return {
				results: [],
				message: "No stocks found",
				success: false,
			};
		}
		return {
			results: data.results,
			message: "Success",
			success: true,
		};
	} catch (error) {
		console.error("Error fetching stocks:", error);
		return {
			results: [],
			message: "Error fetching stocks",
			success: false,
		};
	}
};

export const fetchMoreStocks = async (
	searchQuery = "",
	stocks: Stock[] = [],
	setStocks: (stocks: Stock[]) => void
) => {
	try {
		const data = await fetchStocks(searchQuery, stocks.length + 10);
		if (data.success) {
			setStocks([...stocks, ...data.results]);
		}
	} catch (error) {
		console.error("Failed to fetch more stocks:", error);
	}
};
