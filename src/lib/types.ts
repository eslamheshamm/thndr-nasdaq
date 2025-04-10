export interface Stock {
	ticker: string;
	name: string;
}

export interface StockResponse {
	results: Stock[];
	message: string;
	success: boolean;
	isEmpty?: boolean;
}

export interface StockStore {
	stocks: Stock[];
	searchQuery: string;
	setStocks: (stocks: Stock[]) => void;
	setSearchQuery: (searchQuery: string) => void;
}
