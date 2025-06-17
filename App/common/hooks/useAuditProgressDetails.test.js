import * as redux from "react-redux";
import useAuditProgressDetails from "./useAuditProgressDetails";
import { renderHook } from "@testing-library/react-hooks";
import idb from "idb-keyval";

import audits from "@/jest-test-data/useAuditProgressDetails/audits";
import auditAssets from "@/jest-test-data/useAuditProgressDetails/auditAssets";
import altAssets from "@/jest-test-data/useAuditProgressDetails/altAssets";

jest.mock("idb-keyval", () => ({
    get: jest.fn(),
}));

const state = {
    audits,
    auditAssets,
    altAssets,
};

describe("hooks/useAuditProgressDetails", () => {
    test("loading data from state", async () => {
        jest.spyOn(redux, "useSelector").mockImplementation((callback) =>
            callback(state)
        );
        const { result } = renderHook(() =>
            useAuditProgressDetails("state", 10)
        );

        const expectedResult = {
            alt: 1,
            assigned: 0,
            isComplete: false,
            required: 1,
        };
        expect(result.current).toEqual(expectedResult);
    });

    test("loading data from db", async () => {
        jest.spyOn(redux, "useSelector").mockImplementation((callback) =>
            callback(state)
        );

        idb.get
            .mockReturnValueOnce(altAssets.data)
            .mockReturnValueOnce(auditAssets.data);

        const { result, waitForNextUpdate } = renderHook(() =>
            useAuditProgressDetails("db", 10)
        );
        await waitForNextUpdate();

        const expectedResult = {
            alt: 1,
            assigned: 0,
            isComplete: false,
            required: 1,
        };

        expect(result.current).toEqual(expectedResult);
    });

    test("no auditId", async () => {
        jest.spyOn(redux, "useSelector").mockImplementation((callback) =>
            callback(state)
        );

        const { result } = renderHook(() =>
            useAuditProgressDetails("store", 0)
        );

        const expectedResult = {
            alt: 0,
            assigned: 0,
            isComplete: false,
            required: 0,
        };

        expect(result.current).toEqual(expectedResult);
    });
});
