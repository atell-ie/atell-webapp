import reducer from "./reducer";

describe("app-settings reducer", () => {
    const initialState = {
        drawerOpen: true,
        paginationRowsPerPage: 10,
    };
    test("initialState", async () => {
        expect(reducer(undefined, {})).toMatchObject(initialState);
    });

    test("appStateUpdate", async () => {
        const appSetting = {
            drawerOpen: true,
            paginationRowsPerPage: 10,
        };
        const updatedAppSetting = {
            drawerOpen: false,
            paginationRowsPerPage: 15,
        };
        const action = {
            payload: { appSetting },
            type: "APP_STATE_UPDATE",
        };

        const reducerResult = reducer(updatedAppSetting, action);
        expect(updatedAppSetting).toMatchObject(reducerResult);
    });
});
