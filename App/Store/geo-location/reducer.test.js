import reducer from "./reducer";

describe("geo-location reducer", () => {
    const initialState = {
        coords: {
            accuracy: -1,
            altitude: -1,
            altitudeAccuracy: -1,
            heading: -1,
            latitude: -1,
            longitude: -1,
            speed: -1,
        },
    };
    test("initialState", async () => {
        expect(reducer(undefined, {})).toMatchObject(initialState);
    });

    test("geoLocationGetSuccess ", async () => {
        const action = {
            payload: { ...initialState },
            type: "GEO_LOCATION_GET_SUCCESS",
        };

        const reducerResult = reducer(initialState, action);
        expect(initialState).toMatchObject(reducerResult);
    });
});
