import { ERROR_ACTION, WAIT_FOR_ACTION } from "redux-wait-for-action";

export const actionTypes = {
    INIT_MAPPING: "INIT_MAPPING",
    UPDATE_DATA: "UPDATE_DATA",

    GET_RESULTS: "GET_RESULTS",
    GET_RESULTS_SUCCESS: "GET_RESULTS_SUCCESS",
    GET_RESULTS_FAILURE: "GET_RESULTS_FAILURE",

    PATCH_RESULTS: "PATCH_RESULTS",
    PATCH_RESULTS_SUCCESS: "PATCH_RESULTS_SUCCESS",
    PATCH_RESULTS_FAILURE: "PATCH_RESULTS_FAILURE",

    PATCH_RESULT_TARGET: "PATCH_RESULT_TARGET",
    PATCH_RESULT_TARGET_SUCCESS: "PATCH_RESULT_TARGET_SUCCESS",
    PATCH_RESULT_TARGET_FAILURE: "PATCH_RESULT_TARGET_FAILURE"
};

export const actionCreators = {
    initMapping: (data: integer) => ({
        type: actionTypes.INIT_MAPPING,
        payload: { data }
    }),
    updateData: (data: any) => ({
        type: actionTypes.UPDATE_DATA,
        payload: { data }
    }),

    getResults: (sessionId: inteteger) => ({
        type: actionTypes.GET_RESULTS,
        payload: { sessionId },
        [WAIT_FOR_ACTION]: actionTypes.GET_RESULTS_SUCCESS,
        [ERROR_ACTION]: actionTypes.GET_RESULTS_FAILURE
    }),
    getResultsSuccess: (resultsData: any) => ({
        type: actionTypes.GET_RESULTS_SUCCESS,
        payload: { resultsData },
        saveReduxState: true
    }),
    getResultsFailure: (error: Error) => ({
        type: actionTypes.GET_RESULTS_FAILURE,
        error
    }),

    patchResults: (updData: inteteger) => ({
        type: actionTypes.PATCH_RESULTS,
        payload: { updData },
        [WAIT_FOR_ACTION]: actionTypes.PATCH_RESULTS_SUCCESS,
        [ERROR_ACTION]: actionTypes.PATCH_RESULTS_FAILURE
    }),
    patchResultsSuccess: (patchedData: any) => ({
        type: actionTypes.PATCH_RESULTS_SUCCESS,
        payload: { patchedData },
        saveReduxState: true
    }),
    patchResultssFailure: (error: Error) => ({
        type: actionTypes.PATCH_RESULTS_FAILURE,
        error
    }),

    patchResultTarget: (updData: any, resultTargetId: integer) => ({
        type: actionTypes.PATCH_RESULT_TARGET,
        payload: { updData, resultTargetId },
        [WAIT_FOR_ACTION]: actionTypes.PATCH_RESULT_TARGET_SUCCESS,
        [ERROR_ACTION]: actionTypes.PATCH_RESULT_TARGET_FAILURE
    }),
    patchResultTargetSuccess: (patchedData: any) => ({
        type: actionTypes.PATCH_RESULT_TARGET_SUCCESS,
        payload: { patchedData },
        saveReduxState: true
    }),
    patchResultTargetFailure: (error: Error) => ({
        type: actionTypes.PATCH_RESULT_TARGET_FAILURE,
        error
    })
};

export default {
    create: actionCreators,
    type: actionTypes
};
