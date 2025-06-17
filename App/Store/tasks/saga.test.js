import { selectRequestFromDb, writeRequestToDb } from "./saga";
import customRunSaga from "@/jest-test/customRunSaga";
import { actionTypes } from "./actions";
import auditAssetRedux from "@/jest-test-data/Store/audit-assets/auditAssetRedux.js";

import idb from "idb-keyval";

jest.mock("idb-keyval", () => ({
    get: jest.fn(),
    update: jest.fn(),
}));

describe("audit-assets saga", () => {
    const auditAssetData = auditAssetRedux.data[0];

    test("selectSuccess", async () => {
        const assetIds = [59483];
        const action = {
            payload: { auditAssets: auditAssetRedux.data, assetIds },
            type: actionTypes.AUDIT_ASSETS_SELECT_SUCCESS,
        };
        const dispatched = await customRunSaga(selectRequestFromDb, action);
        idb.get.mockResolvedValue([auditAssetData]);

        expect(dispatched[0].type).toEqual(
            actionTypes.AUDIT_ASSETS_SELECT_SUCCESS
        );
    });

    test("selectFailure", async () => {
        const locIds = [59483];
        const action = {
            payload: { auditAssets: auditAssetRedux.data, locIds },
            type: actionTypes.AUDIT_ASSETS_SELECT_SUCCESS,
        };
        idb.get.mockRejectedValue("Mocked error");

        const dispatched = await customRunSaga(selectRequestFromDb, action);

        expect(dispatched[0].type).toEqual(
            actionTypes.AUDIT_ASSETS_SELECT_FAILURE
        );
        expect(dispatched[0].error).toEqual("Mocked error");
    });

    test("writeSuccess", async () => {
        const action = {
            type: actionTypes.AUDIT_ASSETS_WRITE_FAILURE,
            payload: {
                auditAssets: [auditAssetData],
            },
        };
        idb.update.mockResolvedValue([]);
        const dispatched = await customRunSaga(writeRequestToDb, action);

        expect(dispatched[0].type).toEqual(
            actionTypes.AUDIT_ASSETS_WRITE_SUCCESS
        );

        expect(dispatched[0].payload).toEqual({
            auditAssets: [auditAssetData],
        });
    });

    test("writeFailure", async () => {
        const dispatched = await customRunSaga(writeRequestToDb, undefined);
        expect(dispatched[0].type).toEqual(
            actionTypes.AUDIT_ASSETS_WRITE_FAILURE
        );
        expect(dispatched[0].error).toEqual(
            "TypeError: Cannot read properties of undefined (reading 'payload')"
        );
    });
});
