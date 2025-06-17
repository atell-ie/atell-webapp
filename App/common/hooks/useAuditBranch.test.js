import React from "react";
import * as redux from "react-redux";
import useAuditBranch from "./useAuditBranch";
import { renderHook } from "@testing-library/react-hooks";

// short version of auditAssignment
const auditAssignment = {
    auditLocation: {
        audit: {
            branch: {
                id: 9,
                name: "Test Branch",
            },
        },
    },
};

describe("hooks/useAuditBranch", () => {
    test("auditAssignment passed", async () => {
        const { result } = renderHook(() => useAuditBranch(auditAssignment));
        expect(result.current).toBe("Test Branch");
    });

    test("NO auditAssignment passed", async () => {
        const { result } = renderHook(() => useAuditBranch());
        expect(result.current).toBe("");
    });
});
