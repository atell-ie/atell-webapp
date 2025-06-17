import React from "react";
import * as redux from "react-redux";
import useAuditAsset from "./useAuditAsset";
import { renderHook } from "@testing-library/react-hooks";
import auditAssets from "@/jest-test-data/AuditAsset/auditAssets";

const state = { auditAssets };

describe("hooks/useAuditAsset", () => {
    test("assetId passed", () => {
        jest.spyOn(redux, "useSelector").mockImplementation((callback) =>
            callback(state)
        );

        const assetId = 64182;

        const expectedResult = auditAssets.data[0];

        const { result } = renderHook(() => useAuditAsset(assetId));

        const output = JSON.stringify(result.current);
        expect(output).toBe(JSON.stringify(expectedResult));
    });

    test("NO assetId passed", () => {
        jest.spyOn(redux, "useSelector").mockImplementation((callback) =>
            callback(state)
        );

        const { result } = renderHook(() => useAuditAsset());

        expect(result.current).toBe(JSON.stringify(undefined));
    });
});
