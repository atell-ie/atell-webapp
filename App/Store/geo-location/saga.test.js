import { geoLocationGet } from "./saga";
import customRunSaga from "@/jest-test/customRunSaga";
import { actionTypes } from "./actions";

describe("geo-locations saga", () => {
    test("getSuccess", async () => {
        /** Mock get Current Posisition Success*/
        const mockGeolocation = {
            getCurrentPosition: jest.fn().mockImplementationOnce((success) =>
                Promise.resolve(
                    success({
                        coords: { test: "This is a test object" },
                    })
                )
            ),
        };
        global.navigator.geolocation = mockGeolocation;

        const dispatched = await customRunSaga(geoLocationGet);
        const coords = {
            altitude: undefined,
            altitudeAccuracy: undefined,
            heading: undefined,
            latitude: undefined,
            longitude: undefined,
            speed: undefined,
        };

        expect(dispatched[0].type).toEqual(
            actionTypes.GEO_LOCATION_GET_SUCCESS
        );
        expect(dispatched[0].payload).toMatchObject({ coords });
    });

    test("getFailure", async () => {
        /** Mock get Current Posisition  Error*/
        const mockGeolocation = {
            getCurrentPosition: jest
                .fn()
                .mockImplementationOnce((success, error) =>
                    Promise.resolve(
                        error({
                            message: "GeoLocation Error",
                        })
                    )
                ),
        };
        global.navigator.geolocation = mockGeolocation;
        const dispatched = await customRunSaga(geoLocationGet);

        expect(dispatched[0].type).toEqual(
            actionTypes.GEO_LOCATION_GET_FAILURE
        );
    });
});
