import React from "react";
import useNetConnected from "./useNetConnected";
import * as redux from "react-redux";
import { renderHook } from "@testing-library/react-hooks";

const state = {
    app: {
        netConnected: true,
    },
};

// Issue localStorage is not async
describe("hooks/useNetConnected", () => {
    jest.spyOn(redux, "useSelector").mockImplementation((callback) =>
        callback(state)
    );
    test("test connected", () => {
        const { result } = renderHook(() => useNetConnected());
        expect(result.current).toBe(true);
    });

    test("test NOT connected", () => {
        state.app.netConnected = false;
        const { result } = renderHook(() => useNetConnected());
        expect(result.current).toBe(false);
    });
});
