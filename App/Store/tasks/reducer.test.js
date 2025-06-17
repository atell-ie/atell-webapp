import reducer from "./reducer";
import getInitialState from "../get-initial-state";
//AUDIT_ASSET_SELECT_SUCCESS
import auditAssetDB from "@/jest-test-data/Store/audit-assets/auditAssetDB.js";
import auditAssetRedux from "@/jest-test-data/Store/audit-assets/auditAssetRedux.js";
//AUDIT_ASSETS_WRITE_SUCCESS
import auditAssetNewData from "@/jest-test-data/Store/audit-assets/auditAssetNewData.js";
import auditAssetUpdatedRedux from "@/jest-test-data/Store/audit-assets/auditAssetUpdatedRedux.js";

//AUDIT_ASSET_UPD
import auditAssetUpdatedAssignmentIds from "@/jest-test-data/Store/audit-assets/auditAssetUpdatedAssignmentIds.js";

describe("audit-asset reducer", () => {
    test("initialState", async () => {
        expect(reducer(undefined, {})).toMatchObject(getInitialState.list());
    });

    test("itemClear", () => {
        const action = {
            payload: { auditAsset: auditAssetRedux.data[0] },
            type: "AUDIT_ASSETS_ITEM_CLEAR",
        };
        const auditAssetItemClear = auditAssetRedux;
        auditAssetItemClear.item = null;

        const reducerResult = reducer(auditAssetItemClear, action);
        expect(reducerResult.item).toEqual(null);
    });

    test("itemSet", () => {
        const action = {
            payload: { auditAsset: auditAssetRedux.data[0] },
            type: "AUDIT_ASSET_ITEM_SET",
        };
        const auditAssetItemSet = auditAssetRedux;
        const reducerResult = reducer(auditAssetItemSet, action);

        expect(reducerResult.item).toMatchObject(auditAssetRedux.data[0]);
    });

    test("itemUpdate", () => {
        const action = {
            payload: { auditAsset: auditAssetRedux.data[0] },
            type: "AUDIT_ASSET_ITEM_UPDATE",
        };
        const auditAssetItemUpdate = auditAssetRedux;
        auditAssetItemUpdate.item = auditAssetRedux.data[1];

        const reducerResult = reducer(auditAssetItemUpdate, action);
        expect(reducerResult.item).toMatchObject(auditAssetRedux.data[0]);
    });

    test("itemClear", () => {
        expect(reducer(undefined, {})).toMatchObject(getInitialState.list());
    });

    test("selectSuccess", () => {
        const action = {
            payload: { auditAssets: auditAssetDB },
            type: "AUDIT_ASSETS_SELECT_SUCCESS",
        };
        // Setting null to maintain initial state for testing. To avoid cache data of prev result.
        auditAssetRedux.item = null;

        const reducerResult = reducer(undefined, action);
        expect(reducerResult).toMatchObject(auditAssetRedux);
    });

    test("writeSuccess", () => {
        const action = {
            payload: {
                auditAssets: [auditAssetNewData],
            },
            type: "AUDIT_ASSETS_WRITE_SUCCESS",
        };

        const reducerResult = reducer(auditAssetRedux, action);

        expect(reducerResult).toMatchObject(auditAssetUpdatedRedux);
    });

    test("dataUpdate", () => {
        const assetIds = [59483];
        const action = {
            payload: { auditAssets: auditAssetUpdatedRedux.data, assetIds },
            type: "AUDIT_ASSETS_DATA_UPD",
        };
        const reducerResult = reducer(auditAssetUpdatedRedux, action);

        //Reducer should update the assignment ids
        expect(reducerResult).toMatchObject(auditAssetUpdatedAssignmentIds);
    });
});
