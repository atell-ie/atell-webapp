import actions from "./actions";

describe("audit-upload actions", () => {
    test("postRequest", () => {
        const assignments = { test: "test" };
        const actionReturnValue = actions.create.postRequest(assignments);
        expect(actionReturnValue.type).toEqual("ASSET_SYNC_POST_REQUEST");
    });

    test("postSuccess", () => {
        const assetSync = { test: "test" };
        const actionReturnValue = actions.create.postSuccess(assetSync);
        expect(actionReturnValue.type).toEqual("ASSET_SYNC_POST_SUCCESS");
    });

    test("postFailure", () => {
        const error = { test: "test" };
        const actionReturnValue = actions.create.postFailure(error);
        expect(actionReturnValue.type).toEqual("ASSET_SYNC_POST_FAILURE");
        expect(actionReturnValue.error).toMatchObject(error);
    });

    test("syncStart", () => {
        const syncStatus = { test: "test" };
        const actionReturnValue = actions.create.start(syncStatus);
        expect(actionReturnValue.type).toEqual("ASSET_SYNC_START");
    });

    test("syncStop", () => {
        const syncStatus = { test: "test" };
        const actionReturnValue = actions.create.stop(syncStatus);
        expect(actionReturnValue.type).toEqual("ASSET_SYNC_STOP");
    });
});
