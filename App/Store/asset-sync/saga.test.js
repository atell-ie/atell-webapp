import { post } from "./saga";
import customRunSaga from "@/jest-test/customRunSaga";
import actions from "../actions";
import * as redux from "react-redux";
import { store } from "../../Store";
import idb from "idb-keyval";
import { audits } from "@/jest-test-data/Store/asset-sync/audits";
import { auditCompletion } from "@/jest-test-data/Store/asset-sync/auditCompletion";
import { auditAssets } from "@/jest-test-data/Store/asset-sync/auditAssets";
import { auditLocations } from "@/jest-test-data/Store/asset-sync/auditLocations";
import { auth } from "@/jest-test-data/Store/asset-sync/auth";
import { app } from "@/jest-test-data/Store/asset-sync/app";

const state = { audits, auditLocations, auditCompletion, app };
/** Mocking get and update for idb-keyval*/
jest.mock("idb-keyval", () => ({
    get: jest.fn(),
    update: jest.fn(),
}));
/** Mocking select  for redux-saga*/
let mockSelect = jest.fn();

jest.mock("redux-saga/effects", () => ({
    ...jest.requireActual("redux-saga/effects"),
    select: (callback) => callback(mockSelect),
}));

describe("asset-sync saga", () => {
    /** Redux Store Mock */
    mockSelect = state;
    jest.spyOn(redux, "useSelector").mockImplementation((callback) =>
        callback(mockSelect)
    );

    /** Mocking Fetch*/
    const fakeResponse = {
        ok: true,
        staus: 200,
        text: jest.fn().mockImplementation(() => {
            return [JSON.stringify([{ isAssigned: true }])];
        }),
    };
    global.fetch = jest.fn(() => Promise.resolve(fakeResponse));
    /** Mocking store  for auth for http*/
    jest.mock("../../Store");
    const mockStore = { auth };
    store.getState = () => mockStore;

    test("postSuccess", async () => {
        idb.get.mockReturnValueOnce(auditAssets);

        const dispatched = await customRunSaga(post);

        expect(dispatched[3].type).toEqual(
            actions.assetSync.type.ASSET_SYNC_POST_SUCCESS
        );
    });

    test("postFailure", async () => {
        idb.get.mockRejectedValueOnce("Error");
        const dispatched = await customRunSaga(post);
        expect(dispatched[1].type).toEqual(
            actions.assetSync.type.ASSET_SYNC_POST_FAILURE
        );
    });
});
