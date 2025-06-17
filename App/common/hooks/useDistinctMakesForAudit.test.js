import * as redux from "react-redux";
import useDistinctMakesForAudit from "./useDistinctMakesForAudit";
import { renderHook } from "@testing-library/react-hooks";
import typesList from "@/jest-test-data/typesList";
import audits from "@/jest-test-data/AuditAsset/audits";
import auditLocations from "@/jest-test-data/AuditAsset/auditLocations";
import auditAsset from "@/jest-test-data/useDistinctMakesForAudit/auditAsset";
import auditAssets from "@/jest-test-data/useDistinctMakesForAudit/auditAssets";

let mockedDbGet = auditAssets.data;

jest.mock("idb-keyval", () => ({
    ...jest.requireActual("idb-keyval"),
    get: () => mockedDbGet,
}));

const state = { audits, auditLocations, typesList };

describe("hooks/useDistinctMakesForAudit", () => {
    test("no duplicated makes passsed", async () => {
        mockedDbGet = auditAsset.data;

        jest.spyOn(redux, "useSelector").mockImplementation((callback) =>
            callback(state)
        );

        const { result, waitForNextUpdate } = renderHook(() =>
            useDistinctMakesForAudit(773)
        );
        await waitForNextUpdate();

        const expectedOutput = [{ id: 909, name: "mazda" }];

        const output = JSON.stringify(result.current);
        expect(output).toBe(JSON.stringify(expectedOutput));
    });

    test("duplicated makes", async () => {
        mockedDbGet = auditAssets.data;

        jest.spyOn(redux, "useSelector").mockImplementation((callback) =>
            callback(state)
        );

        const { result, waitForNextUpdate } = renderHook(() =>
            useDistinctMakesForAudit(773)
        );
        await waitForNextUpdate();

        const expectedOutput = [
            { id: 909, name: "mazda" },
            { id: 900, name: "mastercraft" },
        ];

        const output = JSON.stringify(result.current);
        expect(output).toBe(JSON.stringify(expectedOutput));
    });
});
