import React from "react";
import useLocalStorage from "./useLocalStorage";
import { renderHook, act } from "@testing-library/react-hooks";

// Issue localStorage is not async
describe("hooks/useLocalStorage", () => {
    test("test default value", () => {
        const { result } = renderHook(() =>
            useLocalStorage("persist:root", "")
        );
        const [value, setValue] = result.current;
        expect(value).toBe("");
    });

    test("test setValue", async () => {
        const { result } = renderHook(() =>
            useLocalStorage("persist:root", "")
        );

        const [value, setValue] = result.current;

        act(() => {
            setValue("testValue");
        });

        const localValue = JSON.parse(localStorage.getItem("persist:root"));
        expect(localValue).toBe("testValue");
    });
});
