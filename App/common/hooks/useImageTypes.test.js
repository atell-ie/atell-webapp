import React from "react";
import * as redux from "react-redux";
import useImageTypes from "./useImageTypes";
import { renderHook } from "@testing-library/react-hooks";
import typesList from "@/jest-test-data/typesList";

const state = { typesList };

describe("hooks/useImageTypes", () => {
    test("exclusionReasonTypeId passed", async () => {
        jest.spyOn(redux, "useSelector").mockImplementation((callback) =>
            callback(state)
        );

        const exclusionReasonTypeId = 1;
        const assetTypeIds = [6];

        const { result } = renderHook(() =>
            useImageTypes(assetTypeIds, exclusionReasonTypeId)
        );

        const expectedOutput = [
            { id: 6, isActive: true, name: "sales invoice" },
            { id: 7, isActive: true, name: "transfer notification" },
            { id: 8, isActive: true, name: "booking Information" },
            { id: 9, isActive: true, name: "purchase order" },
            { id: 10, isActive: true, name: "proof of delivery" },
        ];

        const output = JSON.stringify(result.current);
        expect(output).toBe(JSON.stringify(expectedOutput));
    });

    test("NO exclusionReasonTypeId passed", async () => {
        jest.spyOn(redux, "useSelector").mockImplementation((callback) =>
            callback(state)
        );

        const exclusionReasonTypeId = undefined;
        const assetTypeIds = [6];

        const { result } = renderHook(() =>
            useImageTypes(assetTypeIds, exclusionReasonTypeId)
        );

        const expectedOutput = [
            { id: 1, isActive: true, name: "chassis number" },
            { id: 2, isActive: true, name: "registration number" },
            { id: 3, isActive: true, name: "full vehicle" },
            { id: 4, isActive: true, name: "odometer" },
            { id: 5, isActive: true, name: "damage" },
            { id: 6, isActive: true, name: "sales invoice" },
            { id: 7, isActive: true, name: "transfer notification" },
            { id: 8, isActive: true, name: "booking Information" },
            { id: 9, isActive: true, name: "purchase order" },
            { id: 10, isActive: true, name: "proof of delivery" },
        ];

        const output = JSON.stringify(result.current);
        expect(output).toBe(JSON.stringify(expectedOutput));
    });

    test("NO typesList.imageTypes.data", async () => {
        state.typesList.imageTypes.data = [];

        jest.spyOn(redux, "useSelector").mockImplementation((callback) =>
            callback(state)
        );

        const exclusionReasonTypeId = undefined;
        const assetTypeIds = [6];

        const { result } = renderHook(() =>
            useImageTypes(assetTypeIds, exclusionReasonTypeId)
        );

        const expectedOutput = [null];

        const output = JSON.stringify(result.current);
        expect(output).toBe(JSON.stringify(expectedOutput));
    });
});
