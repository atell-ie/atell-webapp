import reducer from "./reducer";

describe("app reducer", () => {
    const initialState = {
        backgroundSyncEnabled: true,
        backgroundSyncRequest: false,
        netConnected: false,
    };

    test("initialState", async () => {
        expect(reducer(undefined, {})).toMatchObject(initialState);
    });

    test("appSettingSet", async () => {
        const appState = {
            backgroundSyncEnabled: true,
            backgroundSyncRequest: false,
            netConnected: false,
        };
        const updatedState = {
            backgroundSyncEnabled: false,
            backgroundSyncRequest: true,
            netConnected: true,
        };
        const action = {
            payload: { appState },
            type: "APP_SETTINGS_SET",
        };

        const reducerResult = reducer(updatedState, action);
        expect(updatedState).toMatchObject(reducerResult);
    });
});
