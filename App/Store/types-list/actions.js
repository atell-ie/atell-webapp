import { ERROR_ACTION, WAIT_FOR_ACTION } from "redux-wait-for-action";

export const actionTypes = {
    TYPES_LIST_GET_FAILURE: "TYPES_LIST_GET_FAILURE",
    TYPES_LIST_GET_REQUEST: "TYPES_LIST_GET_REQUEST",
    TYPES_LIST_GET_SUCCESS: "TYPES_LIST_GET_SUCCESS"

    // TYPES_LIST_SELECT_FAILURE: "TYPES_LIST_SELECT_FAILURE",
    // TYPES_LIST_SELECT_REQUEST: "TYPES_LIST_SELECT_REQUEST",
    // TYPES_LIST_SELECT_SUCCESS: "TYPES_LIST_SELECT_SUCCESS"
};

export const actionCreators = {
    getRequest: () => ({
        type: actionTypes.TYPES_LIST_GET_REQUEST,
        payload: {},
        [WAIT_FOR_ACTION]: actionTypes.TYPES_LIST_GET_SUCCESS,
        [ERROR_ACTION]: actionTypes.TYPES_LIST_GET_FAILURE
    }),
    getSuccess: (typesList: any) => ({
        type: actionTypes.TYPES_LIST_GET_SUCCESS,
        payload: { typesList }
    }),
    getFailure: (error: Error) => ({
        type: actionTypes.TYPES_LIST_GET_FAILURE,
        error
    })

    // selectRequest: () => ({
    //     type: actionTypes.TYPES_LIST_SELECT_REQUEST,
    //     [WAIT_FOR_ACTION]: actionTypes.TYPES_LIST_SELECT_SUCCESS,
    //     [ERROR_ACTION]: actionTypes.TYPES_LIST_SELECT_FAILURE
    // }),
    // selectSuccess: (typesList: any) => ({
    //     type: actionTypes.TYPES_LIST_SELECT_SUCCESS,
    //     payload: { typesList }
    // }),
    // selectFailure: (error: Error) => ({
    //     type: actionTypes.TYPES_LIST_SELECT_FAILURE,
    //     error
    // })
};

export default {
    create: actionCreators,
    type: actionTypes
};
