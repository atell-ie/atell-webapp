import actions from "./actions";

describe("geo-locations actions", () => {
    test("getRequest", () => {
        const actionReturnValue = actions.create.getRequest();

        expect(actionReturnValue.type).toEqual("GEO_LOCATION_GET_REQUEST");
    });

    test("getSuccess", () => {
        const coords = { test: "test" };
        const actionReturnValue = actions.create.getSuccess(coords);

        expect(actionReturnValue.type).toEqual("GEO_LOCATION_GET_SUCCESS");
        expect(actionReturnValue.payload).toMatchObject({ coords });
    });

    test("getFailure", () => {
        const error = { test: "test" };
        const actionReturnValue = actions.create.getFailure(error);

        expect(actionReturnValue.type).toEqual("GEO_LOCATION_GET_FAILURE");
        expect(actionReturnValue.error).toMatchObject(error);
    });

    test("watchStart", () => {
        const actionReturnValue = actions.create.watchStart();

        expect(actionReturnValue.type).toEqual("GEO_LOCATION_WATCH_START");
    });

    test("watchStop", () => {
        const actionReturnValue = actions.create.watchStop();

        expect(actionReturnValue.type).toEqual("GEO_LOCATION_WATCH_STOP");
    });
});
