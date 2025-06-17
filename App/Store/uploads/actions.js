import { ERROR_ACTION, WAIT_FOR_ACTION } from "redux-wait-for-action";

export const actionTypes = {
    UPLOAD_ITEM_CLEAR: "UPLOAD_ITEM_CLEAR",
    UPLOAD_ITEM_SET: "UPLOAD_ITEM_SET",

    UPLOADS_GET_FAILURE: "UPLOADS_GET_FAILURE",
    UPLOADS_GET_REQUEST: "UPLOADS_GET_REQUEST",
    UPLOADS_GET_SUCCESS: "UPLOADS_GET_SUCCESS",

    UPLOAD_POST_FAILURE: "UPLOAD_POST_FAILURE",
    UPLOAD_POST_REQUEST: "UPLOAD_POST_REQUEST",
    UPLOAD_POST_SUCCESS: "UPLOAD_POST_SUCCESS"
};

export const actionCreators = {
    itemClear: () => ({
        type: actionTypes.UPLOAD_ITEM_CLEAR,
        saveReduxState: true
    }),
    itemSet: (audit: any) => ({
        type: actionTypes.UPLOAD_ITEM_SET,
        payload: { audit },
        saveReduxState: true
    }),

    getRequest: () => ({
        type: actionTypes.UPLOADS_GET_REQUEST,
        payload: {},
        [WAIT_FOR_ACTION]: actionTypes.UPLOADS_GET_SUCCESS,
        [ERROR_ACTION]: actionTypes.UPLOADS_GET_FAILURE
    }),
    getRequestSuccess: (uploads: any) => ({
        type: actionTypes.UPLOADS_GET_SUCCESS,
        payload: { uploads },
        saveReduxState: true
    }),
    getRequestFailure: (error: Error) => ({
        type: actionTypes.UPLOADS_GET_FAILURE,
        error
    }),

    postRequest: (uploadData) => ({
        type: actionTypes.UPLOAD_POST_REQUEST,
        payload: { uploadData },
        [WAIT_FOR_ACTION]: actionTypes.UPLOAD_POST_SUCCESS,
        [ERROR_ACTION]: actionTypes.UPLOAD_POST_FAILURE
    }),
    postRequestSuccess: (newUploadData: any) => ({
        type: actionTypes.UPLOAD_POST_SUCCESS,
        payload: { newUploadData },
        saveReduxState: true
    }),
    postRequestFailure: (error: Error) => ({
        type: actionTypes.UPLOAD_POST_FAILURE,
        error
    })
};

export default {
    create: actionCreators,
    type: actionTypes
};
