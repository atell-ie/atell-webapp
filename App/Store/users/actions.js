import { ERROR_ACTION, WAIT_FOR_ACTION } from "redux-wait-for-action";

export const actionTypes = {
    USER_ITEM_CLEAR: "USER_ITEM_CLEAR",
    USER_ITEM_SET: "USER_ITEM_SET",

    USER_ITEM_SELECT_FAILURE: "USER_ITEM_SELECT_FAILURE",
    USER_ITEM_SELECT_REQUEST: "USER_ITEM_SELECT_REQUEST",
    USER_ITEM_SELECT_SUCCESS: "USER_ITEM_SELECT_SUCCESS",

    USERS_SELECT_FAILURE: "USERS_SELECT_FAILURE",
    USERS_SELECT_REQUEST: "USERS_SELECT_REQUEST",
    USERS_SELECT_SUCCESS: "USERS_SELECT_SUCCESS",

    USERS_CREATE_FAILURE: "USERS_CREATE_FAILURE",
    USERS_CREATE_REQUEST: "USERS_CREATE_REQUEST",
    USERS_CREATE_SUCCESS: "USERS_CREATE_SUCCESS",

    USERS_WRITE_FAILURE: "USERS_WRITE_FAILURE",
    USERS_WRITE_REQUEST: "USERS_WRITE_REQUEST",
    USERS_WRITE_SUCCESS: "USERS_WRITE_SUCCESS"
};

export const actionCreators = {
    itemClear: () => ({
        type: actionTypes.USER_ITEM_CLEAR,
        saveReduxState: true
    }),
    itemSet: (audit: any) => ({
        type: actionTypes.USER_ITEM_SET,
        payload: { audit },
        saveReduxState: true
    }),

    itemSelectRequest: (query: string) => ({
        type: actionTypes.USER_ITEM_SELECT_REQUEST,
        payload: { query },
        [WAIT_FOR_ACTION]: actionTypes.USER_ITEM_SELECT_SUCCESS,
        [ERROR_ACTION]: actionTypes.USER_ITEM_SELECT_FAILURE
    }),
    itemSelectSuccess: (audit: any) => ({
        type: actionTypes.USER_ITEM_SELECT_SUCCESS,
        payload: { audit },
        saveReduxState: true
    }),
    itemSelectFailure: (error: Error) => ({
        type: actionTypes.USER_ITEM_SELECT_FAILURE,
        error
    }),

    createRequest: (newPatient: any) => ({
        type: actionTypes.USERS_CREATE_REQUEST,
        payload: { newPatient },
        [WAIT_FOR_ACTION]: actionTypes.USERS_CREATE_SUCCESS,
        [ERROR_ACTION]: actionTypes.USERS_CREATE_FAILURE
    }),
    createSuccess: (newPatient: Array<any>) => ({
        type: actionTypes.USERS_CREATE_SUCCESS,
        payload: { newPatient },
        saveReduxState: true
    }),
    createFailure: (error) => ({
        type: actionTypes.USERS_CREATE_FAILURE,
        error
    }),

    selectRequest: (query: string) => ({
        type: actionTypes.USERS_SELECT_REQUEST,
        payload: { query },
        [WAIT_FOR_ACTION]: actionTypes.USERS_SELECT_SUCCESS,
        [ERROR_ACTION]: actionTypes.USERS_SELECT_FAILURE
    }),
    selectSuccess: (audits: Array<any>) => ({
        type: actionTypes.USERS_SELECT_SUCCESS,
        payload: { audits },
        saveReduxState: true
    }),
    selectFailure: (error) => ({
        type: actionTypes.USERS_SELECT_FAILURE,
        error
    }),

    writeRequest: (audits: Array<any>) => ({
        type: actionTypes.USERS_WRITE_REQUEST,
        payload: { audits },
        [WAIT_FOR_ACTION]: actionTypes.USERS_WRITE_SUCCESS,
        [ERROR_ACTION]: actionTypes.USERS_WRITE_FAILURE
    }),
    writeSuccess: (audits: Array<any>) => ({
        type: actionTypes.USERS_WRITE_SUCCESS,
        payload: { audits },
        saveReduxState: true
    }),
    writeFailure: (error) => ({
        type: actionTypes.USERS_WRITE_FAILURE,
        error
    })
};

export default {
    create: actionCreators,
    type: actionTypes
};
