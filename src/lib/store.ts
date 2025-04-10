import { create } from "zustand";
import { Stock, StockStore } from "./types";

const useStockStore = create<StockStore>(
	(set: (partial: Partial<StockStore>) => void) => ({
		searchQuery: "",
		setSearchQuery: (query: string) => set({ searchQuery: query }),
		stocks: [],
		setStocks: (stocks: Stock[]) => set({ stocks }),
	})
);

export default useStockStore;
