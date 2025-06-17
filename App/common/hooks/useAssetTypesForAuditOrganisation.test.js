import React from "react";
import * as redux from "react-redux";
import useAssetTypesForAuditOrganisation from "./useAssetTypesForAuditOrganisation";
import { renderHook } from "@testing-library/react-hooks";
import audits from "@/jest-test-data/AuditAsset/audits";
import typesList from "@/jest-test-data/typesList";

const state = { audits, typesList };

describe("hooks/useAssetTypesForAuditOrganisation", () => {
    test("default behaviour", () => {
        jest.spyOn(redux, "useSelector").mockImplementation((callback) =>
            callback(state)
        );

        const expectedResult = [
            { categoryId: 5, id: 6, name: "car" },
            { categoryId: 5, id: 7, name: "motorbike" },
        ];

        const { result } = renderHook(() =>
            useAssetTypesForAuditOrganisation()
        );

        const output = JSON.stringify(result.current);
        expect(output).toBe(JSON.stringify(expectedResult));
    });
});
