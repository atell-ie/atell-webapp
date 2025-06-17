import { ERROR_ACTION, WAIT_FOR_ACTION } from "redux-wait-for-action";

export const actionTypes = {
    BLOCK_ITEM_CLEAR: "BLOCK_ITEM_CLEAR",
    BLOCK_ITEM_SET: "BLOCK_ITEM_SET",
    BLOCK_ITEM_UPDATE: "BLOCK_ITEM_UPDATE",

    BLOCKS_REQUEST: "BLOCKS_REQUEST",
    BLOCKS_REQUEST_SUCCESS: "BLOCKS_REQUEST_SUCCESS",
    BLOCKS_REQUEST_FAILURE: "BLOCKS_REQUEST_FAILURE",

    BLOCK_REQUEST: "BLOCK_REQUEST",
    BLOCK_REQUEST_SUCCESS: "BLOCK_REQUEST_SUCCESS",
    BLOCK_REQUEST_FAILURE: "BLOCK_REQUEST_FAILURE"

    // BLOCKS_WRITE_FAILURE: "BLOCKS_WRITE_FAILURE",
    // BLOCKS_WRITE_REQUEST: "BLOCKS_WRITE_REQUEST",
    // BLOCKS_WRITE_SUCCESS: "BLOCKS_WRITE_SUCCESS"
};

export const actionCreators = {
    itemClear: () => ({
        type: actionTypes.BLOCK_ITEM_CLEAR,
        saveReduxState: true
    }),
    itemSet: (block: any) => ({
        type: actionTypes.BLOCK_ITEM_SET,
        payload: { block },
        saveReduxState: true
    }),
    itemUpdate: (block: any) => ({
        type: actionTypes.BLOCK_ITEM_UPDATE,
        payload: { block },
        saveReduxState: true
    }),

    getRequest: () => ({
        type: actionTypes.BLOCKS_REQUEST,
        payload: {},
        [WAIT_FOR_ACTION]: actionTypes.BLOCKS_REQUEST_SUCCESS,
        [ERROR_ACTION]: actionTypes.BLOCKS_REQUEST_FAILURE
    }),
    getRequestSuccess: (blocks: Array<any>) => ({
        type: actionTypes.BLOCKS_REQUEST_SUCCESS,
        payload: { blocks },
        saveReduxState: true
    }),
    getRequestFailure: (error) => ({
        type: actionTypes.BLOCKS_REQUEST_FAILURE,
        error
    }),

    getBlockRequest: (blockId) => ({
        type: actionTypes.BLOCK_REQUEST,
        payload: { blockId },
        [WAIT_FOR_ACTION]: actionTypes.BLOCK_REQUEST_SUCCESS,
        [ERROR_ACTION]: actionTypes.BLOCK_REQUEST_FAILURE
    }),
    getBlockRequestSuccess: (block: any, blockId: int) => ({
        type: actionTypes.BLOCK_REQUEST_SUCCESS,
        payload: { block, blockId },
        saveReduxState: true
    }),
    getBlockRequestFailure: (error) => ({
        type: actionTypes.BLOCK_REQUEST_FAILURE,
        error
    })
};

export default {
    create: actionCreators,
    type: actionTypes
};
