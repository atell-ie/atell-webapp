import React from "react";
import * as redux from "react-redux";
import useImageTypeOverlay from "./useImageTypeOverlay";
import { renderHook } from "@testing-library/react-hooks";
import typesList from "@/jest-test-data/typesList";

const state = { typesList };

describe("hooks/useImageTypeOverlay", () => {
    test("imageTypeId passed", () => {
        jest.spyOn(redux, "useSelector").mockImplementation((callback) =>
            callback(state)
        );

        const imageTypeId = 1;

        const { result } = renderHook(() => useImageTypeOverlay(imageTypeId));
        const output = result.current;
        expect(output).toBe("");
    });

    test("NO imageTypeId passed", () => {
        jest.spyOn(redux, "useSelector").mockImplementation((callback) =>
            callback(state)
        );

        const { result } = renderHook(() => useImageTypeOverlay());
        const output = result.current;
        expect(output).toBe(null);
    });
});
