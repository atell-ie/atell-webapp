import React from "react";
import * as redux from "react-redux";
import useAuditAssignment from "./useAuditAssignment";
import { renderHook } from "@testing-library/react-hooks";
import auditAssignments from "@/jest-test-data/AuditAsset/auditAssignments";

const state = { auditAssignments };

describe("hooks/useAuditAssignment", () => {
    test("auditLocationId passed", () => {
        jest.spyOn(redux, "useSelector").mockImplementation((callback) =>
            callback(state)
        );

        const expectedResult = {
            auditLocation: {
                audit: {
                    branch: {
                        id: 9,
                        name: "Test Branch A",
                    },
                    endDate: "2022-04-02 08:30:00+00:00",
                    id: 729,
                    name: "Test Audit B/16 Mar 2022 10:57",
                    organisation: {
                        id: 2,
                        name: "Test Organisation",
                    },
                    startDate: "2022-03-16 07:57:05.676000+00:00",
                },
                id: 773,
                location: {
                    id: 36,
                    name: "Finglas North, Dublin, D11 V21K",
                },
            },
            auditor: 7,
            id: 3337,
        };

        const auditLocationId = 773;

        const { result } = renderHook(() =>
            useAuditAssignment(auditLocationId)
        );

        const output = JSON.stringify(result.current);
        expect(output).toBe(JSON.stringify(expectedResult));
    });

    test("NO auditLocationId passed", () => {
        jest.spyOn(redux, "useSelector").mockImplementation((callback) =>
            callback(state)
        );

        const { result } = renderHook(() => useAuditAssignment());
        expect(result.current).toBe(null);
    });
});
