import React from "react";
import * as redux from "react-redux";
import useAssetTypeValidationRules from "./useAssetTypeValidationRules";
import { renderHook } from "@testing-library/react-hooks";
import typesList from "@/jest-test-data/typesList";

const state = { typesList };

describe("hooks/useAssetTypeValidationRules", () => {
    test("typeId passed", () => {
        jest.spyOn(redux, "useSelector").mockImplementation((callback) =>
            callback(state)
        );

        const expectedResult = {
            identifier1: {
                assetTypeId: 15,
                fieldId: 1,
                hasValue: true,
                id: 10,
                invalidChar: null,
                isLookupField: false,
                lookupTable: null,
                maxLength: 17,
                minLength: 7,
                regex: "/^[0-9A-HJ-NPR-Z]+$/i",
            },
            branchRef: {
                assetTypeId: 15,
                fieldId: 27,
                hasValue: true,
                id: 11,
                invalidChar: null,
                isLookupField: true,
                lookupTable: "Branch",
                maxLength: null,
                minLength: null,
                regex: null,
            },
            identifier2: {
                assetTypeId: 15,
                fieldId: 2,
                hasValue: true,
                id: 14,
                invalidChar: null,
                isLookupField: false,
                lookupTable: null,
                maxLength: null,
                minLength: null,
                regex: null,
            },
            make: {
                assetTypeId: 15,
                fieldId: 6,
                hasValue: true,
                id: 18,
                invalidChar: null,
                isLookupField: true,
                lookupTable: "Make",
                maxLength: null,
                minLength: null,
                regex: null,
            },
        };

        const typeId = 15;

        const { result } = renderHook(() =>
            useAssetTypeValidationRules(typeId)
        );

        const output = JSON.stringify(result.current);
        expect(output).toBe(JSON.stringify(expectedResult));
    });

    test("NO typeId passed", () => {
        jest.spyOn(redux, "useSelector").mockImplementation((callback) =>
            callback(state)
        );

        const { result } = renderHook(() => useAssetTypeValidationRules());

        expect(JSON.stringify(result.current)).toBe(JSON.stringify({}));
    });
});
