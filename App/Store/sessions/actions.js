import { ERROR_ACTION, WAIT_FOR_ACTION } from "redux-wait-for-action";

export const actionTypes = {
    SESSIONS_ITEM_CLEAR: "SESSIONS_ITEM_CLEAR",
    SESSIONS_ITEM_SET: "SESSIONS_ITEM_SET",

    SESSIONS_GET: "SESSIONS_GET",
    SESSIONS_GET_SUCCESS: "SESSIONS_GET_SUCCESS",
    SESSIONS_GET_FAILURE: "SESSIONS_GET_FAILURE",

    SESSIONS_POST: "SESSIONS_POST",
    SESSIONS_POST_SUCCESS: "SESSIONS_POST_SUCCESS",
    SESSIONS_POST_FAILURE: "SESSIONS_POST_FAILURE",

    SESSIONS_PUT: "SESSIONS_PUT",
    SESSIONS_PUT_SUCCESS: "SESSIONS_PUT_SUCCESS",
    SESSIONS_PUT_FAILURE: "SESSIONS_PUT_FAILURE",
};  

export const actionCreators = {
    itemClear: () => ({
        type: actionTypes.SESSIONS_ITEM_CLEAR,
        saveReduxState: true
    }),
    itemSet: (audit: any) => ({
        type: actionTypes.SESSIONS_ITEM_SET,
        payload: { audit },
        saveReduxState: true
    }),

    getSessions: (journeyId: string) => ({
        type: actionTypes.SESSIONS_GET,
        payload: { journeyId },
        [WAIT_FOR_ACTION]: actionTypes.SESSIONS_GET_SUCCESS,
        [ERROR_ACTION]: actionTypes.SESSIONS_GET_FAILURE
    }),
    getSessionsSuccess: (sessions: any) => ({
        type: actionTypes.SESSIONS_GET_SUCCESS,
        payload: { sessions },
        saveReduxState: true
    }),
    getSessionsFailure: (error: Error) => ({
        type: actionTypes.SESSIONS_GET_FAILURE,
        error
    }),

    postSessions: (sessionData: any) => ({
        type: actionTypes.SESSIONS_POST,
        payload: { sessionData },
        [WAIT_FOR_ACTION]: actionTypes.SESSIONS_POST_SUCCESS,
        [ERROR_ACTION]: actionTypes.SESSIONS_POST_FAILURE
    }),     
    postSessionsSuccess: (newSessionData: any) => ({
        type: actionTypes.SESSIONS_POST_SUCCESS,
        payload: { newSessionData },
        saveReduxState: true
    }),
    postSessionsFailure: (error: Error) => ({
        type: actionTypes.SESSIONS_POST_FAILURE,
        error
    }),

    putSessions: (sessionData: any) => ({
        type: actionTypes.SESSIONS_PUT,
        payload: { sessionData },
        [WAIT_FOR_ACTION]: actionTypes.SESSIONS_PUT_SUCCESS,
        [ERROR_ACTION]: actionTypes.SESSIONS_PUT_FAILURE
    }),
    putSessionsSuccess: (updatedSessionData: any) => ({
        type: actionTypes.SESSIONS_PUT_SUCCESS,
        payload: { updatedSessionData },
        saveReduxState: true
    }),
    putSessionsFailure: (error: Error) => ({
        type: actionTypes.SESSIONS_PUT_FAILURE,
        error
    }),
}
export default {
    create: actionCreators,
    type: actionTypes
};
