import React from "react";
import * as redux from "react-redux";
import useAudit from "./useAudit";
import { renderHook } from "@testing-library/react-hooks";
import audits from "@/jest-test-data/AuditAsset/audits";

const state = { audits };

describe("hooks/useAudit", () => {
    test("auditId passed", () => {
        jest.spyOn(redux, "useSelector").mockImplementation((callback) =>
            callback(state)
        );

        const auditId = 773;

        const expectedResult = audits.data[0];

        const { result } = renderHook(() => useAudit(auditId));

        const output = JSON.stringify(result.current);
        expect(output).toBe(JSON.stringify(expectedResult));
    });

    test("NO auditId passed", () => {
        jest.spyOn(redux, "useSelector").mockImplementation((callback) =>
            callback(state)
        );

        const { result } = renderHook(() => useAudit());

        expect(result.current).toBe(JSON.stringify(undefined));
    });
});
