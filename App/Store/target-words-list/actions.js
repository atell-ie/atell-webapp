import { ERROR_ACTION, WAIT_FOR_ACTION } from "redux-wait-for-action";

export const actionTypes = {
    TARGET_LIST_ITEM_CLEAR: "TARGET_LIST_ITEM_CLEAR",
    TARGET_LIST_ITEM_SET: "TARGET_LIST_ITEM_SET",

    TARGET_LISTS_GET: "TARGET_LISTS_GET",
    TARGET_LISTS_GET_SUCCESS: "TARGET_LISTS_GET_SUCCESS",
    TARGET_LISTS_GET_FAILURE: "TARGET_LISTS_GET_FAILURE",

    TARGET_LIST_POST: "TARGET_LIST_POST",
    TARGET_LIST_POST_SUCCESS: "TARGET_LIST_POST_SUCCESS",
    TARGET_LIST_POST_FAILURE: "TARGET_LIST_POST_FAILURE",

    TARGET_LIST_PUT: "TARGET_LIST_PUT",
    TARGET_LIST_PUT_SUCCESS: "TARGET_LIST_PUT_SUCCESS",
    TARGET_LIST_PUT_FAILURE: "TARGET_LIST_PUT_FAILURE",

    TARGET_LIST_DELETE: "TARGET_LIST_DELETE",
    TARGET_LIST_DELETE_SUCCESS: "TARGET_LIST_DELETE_SUCCESS",
    TARGET_LIST_DELETE_FAILURE: "TARGET_LIST_DELETE_FAILURE",
};

export const actionCreators = {
    itemClear: () => ({
        type: actionTypes.TARGET_LIST_ITEM_CLEAR,
        saveReduxState: true
    }),
    itemSet: (newItem: any) => ({
        type: actionTypes.TARGET_LIST_ITEM_SET,
        payload: { newItem },
        saveReduxState: true
    }),

    getTargetList: () => ({
        type: actionTypes.TARGET_LISTS_GET,
        payload: {},
        [WAIT_FOR_ACTION]: actionTypes.TARGET_LISTS_GET_SUCCESS,
        [ERROR_ACTION]: actionTypes.TARGET_LISTS_GET_FAILURE
    }),
    getTargetListSuccess: (wordsList: any) => ({
        type: actionTypes.TARGET_LISTS_GET_SUCCESS,
        payload: { wordsList },
        saveReduxState: true
    }),
    getTargetListFailure: (error: Error) => ({
        type: actionTypes.TARGET_LISTS_GET_FAILURE,
        error
    }),

    postTargetList: (newWordsList) => ({
        type: actionTypes.TARGET_LIST_POST,
        payload: { newWordsList },
        [WAIT_FOR_ACTION]: actionTypes.TARGET_LIST_POST_SUCCESS,
        [ERROR_ACTION]: actionTypes.TARGET_LIST_POST_FAILURE
    }),
    postTargetListSuccess: (newWordsList: any) => ({
        type: actionTypes.TARGET_LIST_POST_SUCCESS,
        payload: { newWordsList },
        saveReduxState: true
    }),
    postTargetListFailure: (error: Error) => ({
        type: actionTypes.TARGET_LIST_POST_FAILURE,
        error
    }),

    putTargetList: (wordListId, updWordsList) => ({
        type: actionTypes.TARGET_LIST_PUT,
        payload: { wordListId, updWordsList },
        [WAIT_FOR_ACTION]: actionTypes.TARGET_LIST_PUT_SUCCESS,
        [ERROR_ACTION]: actionTypes.TARGET_LIST_PUT_FAILURE
    }),
    putTargetListSuccess: (wordListId, updWordsList) => ({
        type: actionTypes.TARGET_LIST_PUT_SUCCESS,
        payload: { wordListId, updWordsList },
        saveReduxState: true
    }),
    putTargetListFailure: (error: Error) => ({
        type: actionTypes.TARGET_LIST_PUT_FAILURE,
        error
    }),

    deleteTargetList: (wordListId) => ({
        type: actionTypes.TARGET_LIST_DELETE,
        payload: { wordListId },
        [WAIT_FOR_ACTION]: actionTypes.TARGET_LIST_DELETE_SUCCESS,
        [ERROR_ACTION]: actionTypes.TARGET_LIST_DELETE_FAILURE
    }),
    deleteTargetListSuccess: (wordListId) => ({
        type: actionTypes.TARGET_LIST_DELETE_SUCCESS,
        payload: { wordListId },
        saveReduxState: true
    }),
    deleteTargetListFailure: (error: Error) => ({
        type: actionTypes.TARGET_LIST_DELETE_FAILURE,
        error
    }), 
};

export default {
    create: actionCreators,
    type: actionTypes
};
