import actions from "./actions";

describe("app-settings actions", () => {
    test("appSettingsSet", () => {
        const appSetting = { test: "test" };
        const actionReturnValue = actions.create.set(appSetting);

        expect(actionReturnValue.type).toEqual("APP_SETTINGS_SET");
        expect(actionReturnValue.payload).toMatchObject({ appSetting });
    });
});
