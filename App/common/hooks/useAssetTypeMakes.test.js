import React from "react";
import * as redux from "react-redux";
import useAssetTypeMakes from "./useAssetTypeMakes";
import { renderHook } from "@testing-library/react-hooks";
import typesList from "@/jest-test-data/typesList";

const state = { typesList };

describe("hooks/useAssetTypeMakes", () => {
    test("typeId passed", () => {
        jest.spyOn(redux, "useSelector").mockImplementation((callback) =>
            callback(state)
        );

        const expectedResult = [{ id: 1, name: "unknown" }];

        const typeId = 1;
        const { result } = renderHook(() => useAssetTypeMakes(typeId));

        const output = JSON.stringify(result.current);
        expect(output).toBe(JSON.stringify(expectedResult));
    });

    test("NO typeId passed", () => {
        jest.spyOn(redux, "useSelector").mockImplementation((callback) =>
            callback(state)
        );

        const { result } = renderHook(() => useAssetTypeMakes());
        expect(JSON.stringify(result.current)).toBe(JSON.stringify([]));
    });
});
