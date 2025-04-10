import { toast } from "sonner";
import { StockResponse } from "./types";

const API_KEY = "oVpIGbj9Roor_zdyG0tXc1cmFMOtkX7h";
const BASE_URL = "https://api.polygon.io/v3/reference/tickers";

export const fetchStocks = async (
	searchQuery = "",
	limit = 20
): Promise<StockResponse> => {
	try {
		const response = await fetch(
			`${BASE_URL}?apiKey=${API_KEY}&search=${searchQuery}&limit=${limit}`
		);

		const data = await response.json();

		// handle rate limit exceeded
		if (response.status === 429) {
			toast.error("Rate limit exceeded");
			throw new Error("Rate limit exceeded");
		}

		// handle unauthorized access
		if (response.status === 401) {
			toast.error("Unauthorized access");
			throw new Error("Unauthorized access");
		}

		// handle network response was not ok
		if (!response.ok) {
			toast.error("Network response was not ok");
			throw new Error(`Network response was not ok: ${response.status}`);
		}

		// handle no stocks found
		if (data.results.length === 0) {
			toast.error("No stocks found");
			// Not treating empty results as an error, just return empty results
			return {
				results: [],
				message: "No stocks found",
				success: true,
				isEmpty: true,
			};
		}

		// handle success and return the data
		return {
			results: data.results,
			message: "Success",
			success: true,
			isEmpty: false,
		};
	} catch (error) {
		console.error("Error fetching stocks:", error);
		// Re-throw the error for React Query to catch
		throw error;
	}
};
