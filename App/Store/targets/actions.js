import { ERROR_ACTION, WAIT_FOR_ACTION } from "redux-wait-for-action";

export const actionTypes = {
    TARGET_ITEM_CLEAR: "TARGET_ITEM_CLEAR",
    TARGET_ITEM_SET: "TARGET_ITEM_SET",
    TARGET_ITEM_UPDATE: "TARGET_ITEM_UPDATE",

    TARGETS_REQUEST: "TARGETS_REQUEST",
    TARGETS_REQUEST_SUCCESS: "TARGETS_REQUEST_SUCCESS",
    TARGETS_REQUEST_FAILURE: "TARGETS_REQUEST_FAILURE",

    TARGET_REQUEST: "TARGET_REQUEST",
    TARGET_REQUEST_SUCCESS: "TARGET_REQUEST_SUCCESS",
    TARGET_REQUEST_FAILURE: "TARGET_REQUEST_FAILURE"
};

export const actionCreators = {
    itemClear: () => ({
        type: actionTypes.TARGET_ITEM_CLEAR,
        saveReduxState: true
    }),
    itemSet: (target: any) => ({
        type: actionTypes.TARGET_ITEM_SET,
        payload: { target },
        saveReduxState: true
    }),
    itemUpdate: (section: String, data: any) => ({
        type: actionTypes.TARGET_ITEM_UPDATE,
        payload: { section, data },
        saveReduxState: true
    }),

    getRequest: () => ({
        type: actionTypes.TARGETS_REQUEST,
        payload: {},
        [WAIT_FOR_ACTION]: actionTypes.TARGETS_REQUEST_SUCCESS,
        [ERROR_ACTION]: actionTypes.TARGETS_REQUEST_FAILURE
    }),
    getRequestSuccess: (targets: Array<any>) => ({
        type: actionTypes.TARGETS_REQUEST_SUCCESS,
        payload: { targets },
        saveReduxState: true
    }),
    getRequestFailure: (error) => ({
        type: actionTypes.TARGETS_REQUEST_FAILURE,
        error
    })
};

export default {
    create: actionCreators,
    type: actionTypes
};
