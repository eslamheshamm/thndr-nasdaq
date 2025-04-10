// write test for the useStocks hook useing vitest and mock the api call
import useStockStore from "../store";
import { expect, it, describe } from "vitest";
import { renderHook } from "@testing-library/react-hooks";

describe("useStockStore", () => {
	it("should return the initial state", () => {
		const { result } = renderHook(() => useStockStore());
		expect(result.current.stocks).toEqual([]);
	});
});
