import React from "react";
import * as redux from "react-redux";
import useAssetTypeImageTypes from "./useAssetTypeImageTypes";
import { renderHook } from "@testing-library/react-hooks";
import typesList from "@/jest-test-data/typesList";

const state = { typesList };

describe("hooks/useAssetTypeImageTypes", () => {
    test("typeId passed", () => {
        jest.spyOn(redux, "useSelector").mockImplementation((callback) =>
            callback(state)
        );

        const expectedResult = [
            { id: 1, isActive: true, name: "chassis number" },
            { id: 2, isActive: true, name: "registration number" },
            { id: 3, isActive: true, name: "full vehicle" },
            { id: 6, isActive: true, name: "sales invoice" },
            { id: 7, isActive: true, name: "transfer notification" },
            { id: 8, isActive: true, name: "booking Information" },
            { id: 9, isActive: true, name: "purchase order" },
            { id: 10, isActive: true, name: "proof of delivery" },
        ];

        const typeId = 1;
        const { result } = renderHook(() => useAssetTypeImageTypes(typeId));

        const output = JSON.stringify(result.current);
        expect(output).toBe(JSON.stringify(expectedResult));
    });

    test("NO typeId passed", () => {
        jest.spyOn(redux, "useSelector").mockImplementation((callback) =>
            callback(state)
        );

        const { result } = renderHook(() => useAssetTypeImageTypes());
        expect(JSON.stringify(result.current)).toBe(JSON.stringify([]));
    });
});
