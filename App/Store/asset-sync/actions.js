import { ERROR_ACTION, WAIT_FOR_ACTION } from "redux-wait-for-action";

export const actionTypes = {
    ASSET_SYNC_POST_FAILURE: "ASSET_SYNC_POST_FAILURE",
    ASSET_SYNC_POST_REQUEST: "ASSET_SYNC_POST_REQUEST",
    ASSET_SYNC_POST_SUCCESS: "ASSET_SYNC_POST_SUCCESS",

    ASSET_SYNC_START: "ASSET_SYNC_START",
    ASSET_SYNC_STOP: "ASSET_SYNC_STOP",
};

export const actionCreators = {
    postRequest: () => ({
        type: actionTypes.ASSET_SYNC_POST_REQUEST,
        [WAIT_FOR_ACTION]: actionTypes.ASSET_SYNC_POST_SUCCESS,
        [ERROR_ACTION]: actionTypes.ASSET_SYNC_POST_FAILURE,
    }),
    postSuccess: (assetSync: any) => ({
        type: actionTypes.ASSET_SYNC_POST_SUCCESS,
        payload: { assetSync },
        saveState: true,
    }),
    postFailure: (error) => ({
        type: actionTypes.ASSET_SYNC_POST_FAILURE,
        error,
    }),

    start: () => ({ type: actionTypes.ASSET_SYNC_START }),
    stop: () => ({ type: actionTypes.ASSET_SYNC_STOP }),
};

export default {
    create: actionCreators,
    type: actionTypes,
};
