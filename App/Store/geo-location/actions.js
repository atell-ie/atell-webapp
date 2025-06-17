import { ERROR_ACTION, WAIT_FOR_ACTION } from "redux-wait-for-action";

export const actionTypes = {
    GEO_LOCATION_GET_FAILURE: "GEO_LOCATION_GET_FAILURE",
    GEO_LOCATION_GET_REQUEST: "GEO_LOCATION_GET_REQUEST",
    GEO_LOCATION_GET_SUCCESS: "GEO_LOCATION_GET_SUCCESS",

    GEO_LOCATION_WATCH_START: "GEO_LOCATION_WATCH_START",
    GEO_LOCATION_WATCH_STOP: "GEO_LOCATION_WATCH_STOP",
};

export const actionCreators = {
    /**
     * Geo Location Get
     */
    getRequest: () => ({
        type: actionTypes.GEO_LOCATION_GET_REQUEST,
        [WAIT_FOR_ACTION]: actionTypes.GEO_LOCATION_GET_SUCCESS,
        [ERROR_ACTION]: actionTypes.GEO_LOCATION_GET_FAILURE,
    }),
    getSuccess: (coords) => ({
        type: actionTypes.GEO_LOCATION_GET_SUCCESS,
        payload: { coords },
    }),
    getFailure: (error) => ({
        type: actionTypes.GEO_LOCATION_GET_FAILURE,
        error,
    }),
    /**
     * Geo Location Watch Start
     */
    watchStart: () => ({
        type: actionTypes.GEO_LOCATION_WATCH_START,
    }),
    /**
     * Geo Location Watch Stop
     */
    watchStop: () => ({
        type: actionTypes.GEO_LOCATION_WATCH_STOP,
    }),
};

export default {
    create: actionCreators,
    type: actionTypes,
};
