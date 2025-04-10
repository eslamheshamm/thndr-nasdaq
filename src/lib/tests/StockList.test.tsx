import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import StockList from "../../components/StockList";
import { Stock } from "../types";

// Mock data for testing
const mockStocks: Stock[] = [
	{ ticker: "AAPL", name: "Apple Inc." },
	{ ticker: "MSFT", name: "Microsoft Corporation" },
	{ ticker: "GOOG", name: "Alphabet Inc." },
];

describe("StockList Component", () => {
	it("renders loading skeletons when isLoading is true", () => {
		const { getByText, container } = render(
			<StockList
				isLoading={true}
				data={[]}
				isFetchingNextPage={false}
				isError={false}
				debouncedSearch=""
			/>
		);

		// Check for loading message in screen reader text
		expect(getByText("Loading stocks...")).toBeInTheDocument();

		// Check for skeleton elements
		const skeletons = container.querySelectorAll(".skeleton");
		expect(skeletons.length).toBeGreaterThan(0);
	});

	it("renders stock cards when data is available", () => {
		const { getByText } = render(
			<StockList
				isLoading={false}
				data={mockStocks}
				isFetchingNextPage={false}
				isError={false}
				debouncedSearch=""
			/>
		);

		// Check each stock is rendered
		expect(getByText("Apple Inc.")).toBeInTheDocument();
		expect(getByText("AAPL")).toBeInTheDocument();
		expect(getByText("Microsoft Corporation")).toBeInTheDocument();
		expect(getByText("MSFT")).toBeInTheDocument();
		expect(getByText("Alphabet Inc.")).toBeInTheDocument();
		expect(getByText("GOOG")).toBeInTheDocument();
	});

	it("renders message when no stocks are found with search query", () => {
		const { getByText } = render(
			<StockList
				isLoading={false}
				data={[]}
				isFetchingNextPage={false}
				isError={false}
				debouncedSearch="nonexistent"
			/>
		);

		expect(
			getByText("No stocks found matching your search.")
		).toBeInTheDocument();
	});

	it("renders message when no search query is entered", () => {
		const { getByText } = render(
			<StockList
				isLoading={false}
				data={[]}
				isFetchingNextPage={false}
				isError={false}
				debouncedSearch=""
			/>
		);

		expect(
			getByText("Enter a search term to find stocks.")
		).toBeInTheDocument();
	});

	it("renders loading skeletons when fetching next page", () => {
		const { getByText, container } = render(
			<StockList
				isLoading={false}
				data={mockStocks}
				isFetchingNextPage={true}
				isError={false}
				debouncedSearch=""
			/>
		);

		// Verify stocks are displayed
		expect(getByText("Apple Inc.")).toBeInTheDocument();

		// Check for "Loading more stocks..." message
		expect(getByText("Loading more stocks...")).toBeInTheDocument();

		// Check for skeleton elements
		const skeletons = container.querySelectorAll(".skeleton");
		expect(skeletons.length).toBeGreaterThan(0);
	});
});
