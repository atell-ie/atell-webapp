import React from "react";
import * as redux from "react-redux";
import useDistinctAssetTypesForAudit from "./useDistinctAssetTypesForAudit";
import { renderHook } from "@testing-library/react-hooks";
import typesList from "@/jest-test-data/typesList";
import audits from "@/jest-test-data/AuditAsset/audits";
import auditLocations from "@/jest-test-data/AuditAsset/auditLocations";
import auditAssets from "@/jest-test-data/useDistinctAssetTypesForAudit/auditAssets";
import { get } from "idb-keyval";

const mockedDbGet = auditAssets.data;

jest.mock("idb-keyval", () => ({
    ...jest.requireActual("idb-keyval"),
    get: () => mockedDbGet,
}));

const state = { audits, auditLocations, typesList };

describe("hooks/useDistinctAssetTypesForAudit", () => {
    test("duplicated types passsed", async () => {
        jest.spyOn(redux, "useSelector").mockImplementation((callback) =>
            callback(state)
        );

        const { result, waitForNextUpdate } = renderHook(() =>
            useDistinctAssetTypesForAudit()
        );
        await waitForNextUpdate();

        const expectedOutput = [
            { categoryId: 5, id: 6, name: "car" },
            {
                categoryId: 4,
                id: 5,
                name: "waste / recycling and quarry construction",
            },
        ];

        const output = JSON.stringify(result.current);
        expect(output).toBe(JSON.stringify(expectedOutput));
    });
});
