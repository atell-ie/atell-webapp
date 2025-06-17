import { ERROR_ACTION, WAIT_FOR_ACTION } from "redux-wait-for-action";

export const actionTypes = {
    AUTH_GET_FAILURE: "AUTH_GET_FAILURE",
    AUTH_GET_REQUEST: "AUTH_GET_REQUEST",
    AUTH_GET_SUCCESS: "AUTH_GET_SUCCESS",
    AUTH_LOAD_SESSION: "AUTH_LOAD_SESSION",

    AUTH_LOGOUT: "AUTH_LOGOUT"
};

export const actionCreators = {
    getRequest: (username: string, password: string) => ({
        type: actionTypes.AUTH_GET_REQUEST,
        payload: { password, username },
        [WAIT_FOR_ACTION]: actionTypes.AUTH_GET_SUCCESS,
        [ERROR_ACTION]: actionTypes.AUTH_GET_FAILURE
    }),
    getSuccess: (auth: any) => ({
        type: actionTypes.AUTH_GET_SUCCESS,
        payload: { ...auth }
    }),
    getFailure: (error: Error) => ({
        type: actionTypes.AUTH_GET_FAILURE,
        error
    }),

    loadSession: (user: any) => ({
        type: actionTypes.AUTH_LOAD_SESSION,
        payload: { ...user }
    }),

    logout: () => ({
        type: actionTypes.AUTH_LOGOUT,
        saveReduxState: true
    })
};

export default {
    create: actionCreators,
    type: actionTypes
};
