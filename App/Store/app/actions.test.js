import actions from "./actions";

describe("app actions", () => {
    test("appStateUpdate", () => {
        const appState = { test: "test" };
        const actionReturnValue = actions.create.update(appState);

        expect(actionReturnValue.type).toEqual("APP_STATE_UPDATE");
        expect(actionReturnValue.payload).toMatchObject({ appState });
    });
});
