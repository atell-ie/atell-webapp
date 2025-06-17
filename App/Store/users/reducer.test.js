import reducer from "./reducer";
import getInitialState from "../get-initial-state";
//AUDITS_SELECT_SUCCESS
import auditsDB from "@/jest-test-data/Store/audits/auditsDB.js";
import auditsRedux from "@/jest-test-data/Store/audits/auditsRedux.js";
//AUDITS_WRITE_SUCCESS
import auditsNewData from "@/jest-test-data/Store/audits/auditsNewData.js";
import auditsUpdatedRedux from "@/jest-test-data/Store/audits/auditsUpdatedRedux.js";

describe("audits reducer", () => {
    test("initialState", async () => {
        expect(reducer(undefined, {})).toMatchObject(getInitialState.list());
    });

    test("itemSet", () => {
        const action = {
            payload: { audit: auditsRedux.data[0] },
            type: "AUDIT_ITEM_SET",
        };
        const altAssetItemSet = auditsRedux;
        const reducerResult = reducer(altAssetItemSet, action);

        expect(reducerResult.item).toMatchObject(auditsRedux.data[0]);
    });

    test("selectSuccess", () => {
        const action = {
            payload: { audits: auditsDB },
            type: "AUDITS_SELECT_SUCCESS",
        };
        // Setting null to maintain initial state for testing. To avoid cache data of prev result.
        auditsRedux.item = null;
        const reducerResult = reducer(undefined, action);
        expect(reducerResult).toMatchObject(auditsRedux);
    });

    test("writeSuccess", () => {
        const action = {
            payload: {
                audits: [auditsNewData],
            },
            type: "AUDITS_WRITE_SUCCESS",
        };

        const reducerResult = reducer(auditsRedux, action);

        expect(reducerResult).toMatchObject(auditsUpdatedRedux);
    });
});
