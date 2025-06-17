import { ERROR_ACTION, WAIT_FOR_ACTION } from "redux-wait-for-action";

export const actionTypes = {
    TASK_ITEM_CLEAR: "TASK_ITEM_CLEAR",
    TASK_ITEM_SET: "TASK_ITEM_SET",
    TASK_ITEM_UPDATE: "TASK_ITEM_UPDATE",
    TASK_ITEM_UPDATE_ENTRY: "TASK_ITEM_UPDATE_ENTRY",

    TASKS_REQUEST: "TASKS_REQUEST",
    TASKS_REQUEST_SUCCESS: "TASKS_REQUEST_SUCCESS",
    TASKS_REQUEST_FAILURE: "TASKS_REQUEST_FAILURE",

    TASK_REQUEST: "TASK_REQUEST",
    TASK_REQUEST_SUCCESS: "TASK_REQUEST_SUCCESS",
    TASK_REQUEST_FAILURE: "TASK_REQUEST_FAILURE"

    // TASKS_WRITE_FAILURE: "TASKS_WRITE_FAILURE",
    // TASKS_WRITE_REQUEST: "TASKS_WRITE_REQUEST",
    // TASKS_WRITE_SUCCESS: "TASKS_WRITE_SUCCESS"
};

export const actionCreators = {
    itemClear: () => ({
        type: actionTypes.TASK_ITEM_CLEAR,
        saveReduxState: true
    }),
    itemSet: (task: any) => ({
        type: actionTypes.TASK_ITEM_SET,
        payload: { task },
        saveReduxState: true
    }),
    itemUpdate: (task: any) => ({
        type: actionTypes.TASK_ITEM_UPDATE,
        payload: { task },
        saveReduxState: true
    }),
    itemUpdateEntry: (index: int, mapped: any) => ({
        type: actionTypes.TASK_ITEM_UPDATE_ENTRY,
        payload: { index, mapped },
        saveReduxState: true
    }),

    getRequest: (blockId: int) => ({
        type: actionTypes.TASKS_REQUEST,
        payload: { blockId },
        [WAIT_FOR_ACTION]: actionTypes.TASKS_REQUEST_SUCCESS,
        [ERROR_ACTION]: actionTypes.TASKS_REQUEST_FAILURE
    }),
    getRequestSuccess: (tasks: Array<any>) => ({
        type: actionTypes.TASKS_REQUEST_SUCCESS,
        payload: { tasks },
        saveReduxState: true
    }),
    getRequestFailure: (error) => ({
        type: actionTypes.TASKS_REQUEST_FAILURE,
        error
    }),

    getTaskRequest: (exerciseId) => ({
        type: actionTypes.TASK_REQUEST,
        payload: { exerciseId },
        [WAIT_FOR_ACTION]: actionTypes.TASK_REQUEST_SUCCESS,
        [ERROR_ACTION]: actionTypes.TASK_REQUEST_FAILURE
    }),
    getTaskRequestSuccess: (exercise: any, exerciseId: int) => ({
        type: actionTypes.TASK_REQUEST_SUCCESS,
        payload: { exercise, exerciseId },
        saveReduxState: true
    }),
    getTaskRequestFailure: (error) => ({
        type: actionTypes.TASK_REQUEST_FAILURE,
        error
    })

    // TODO: REPLACEMENT PIECE
    // setAssetAssigned: (assetIds: any) => ({
    //     type: actionTypes.TASKS_DATA_UPD,
    //     payload: { assetIds },
    //     saveReduxState: true,
    // }),

    // writeRequest: (auditAssets: Array<any>) => ({
    //     type: actionTypes.TASKS_WRITE_REQUEST,
    //     payload: { auditAssets },
    //     [WAIT_FOR_ACTION]: actionTypes.TASKS_WRITE_SUCCESS,
    //     [ERROR_ACTION]: actionTypes.TASKS_WRITE_FAILURE,
    // }),
    // writeSuccess: (auditAssets: Array<any>) => ({
    //     type: actionTypes.TASKS_WRITE_SUCCESS,
    //     payload: { auditAssets },
    //     saveReduxState: true,
    // }),
    // writeFailure: (error) => ({
    //     type: actionTypes.TASKS_WRITE_FAILURE,
    //     error,
    // }),
};

export default {
    create: actionCreators,
    type: actionTypes
};
