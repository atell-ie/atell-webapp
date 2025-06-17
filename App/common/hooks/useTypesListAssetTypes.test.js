import React from "react";
import * as redux from "react-redux";
import useTypesListAssetTypes from "./useTypesListAssetTypes";
import { renderHook } from "@testing-library/react-hooks";
import typesList from "@/jest-test-data/typesList";

const state = { typesList };

describe("hooks/useTypesListAssetTypes", () => {
    test("typeId passed", () => {
        jest.spyOn(redux, "useSelector").mockImplementation((callback) =>
            callback(state)
        );

        const expectedResult = { categoryId: 10, id: 1, name: "unknown" };

        const typeId = 1;

        const { result } = renderHook(() => useTypesListAssetTypes(typeId));
        const output = JSON.stringify(result.current);
        expect(output).toBe(JSON.stringify(expectedResult));
    });

    test("NO typeId passed", () => {
        jest.spyOn(redux, "useSelector").mockImplementation((callback) =>
            callback(state)
        );

        const { result } = renderHook(() => useTypesListAssetTypes());
        expect(result.current).toBe(undefined);
    });
});
