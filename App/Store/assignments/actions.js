import { ERROR_ACTION, WAIT_FOR_ACTION } from "redux-wait-for-action";

export const actionTypes = {
    ASSIGNMENT_ITEM_CLEAR: "ASSIGNMENT_ITEM_CLEAR",
    ASSIGNMENT_ITEM_SET: "ASSIGNMENT_ITEM_SET",
    ASSIGNMENT_ITEM_UPDATE: "ASSIGNMENT_ITEM_UPDATE",

    ASSIGNMENTS_REQUEST: "ASSIGNMENTS_REQUEST",
    ASSIGNMENTS_REQUEST_SUCCESS: "ASSIGNMENTS_REQUEST_SUCCESS",
    ASSIGNMENTS_REQUEST_FAILURE: "ASSIGNMENTS_REQUEST_FAILURE",

    ASSIGNMENT_REQUEST: "ASSIGNMENT_REQUEST",
    ASSIGNMENT_REQUEST_SUCCESS: "ASSIGNMENT_REQUEST_SUCCESS",
    ASSIGNMENT_REQUEST_FAILURE: "ASSIGNMENT_REQUEST_FAILURE",

    POST_ASSIGNMENT_REQUEST: "POST_ASSIGNMENT_REQUEST",
    POST_ASSIGNMENT_SUCCESS: "POST_ASSIGNMENT_SUCCESS",
    POST_ASSIGNMENT_FAILURE: "POST_ASSIGNMENT_FAILURE",

    PUT_ASSIGNMENT_REQUEST: "PUT_ASSIGNMENT_REQUEST",
    PUT_ASSIGNMENT_SUCCESS: "PUT_ASSIGNMENT_SUCCESS",
    PUT_ASSIGNMENT_FAILURE: "PUT_ASSIGNMENT_FAILURE"
};

export const actionCreators = {
    itemClear: () => ({
        type: actionTypes.ASSIGNMENT_ITEM_CLEAR,
        saveReduxState: true
    }),
    itemSet: (item: any) => ({
        type: actionTypes.ASSIGNMENT_ITEM_SET,
        payload: { item },
        saveReduxState: true
    }),
    itemUpdate: (section: String, data: any) => ({
        type: actionTypes.ASSIGNMENT_ITEM_UPDATE,
        payload: { section, data },
        saveReduxState: true
    }),

    getRequest: () => ({
        type: actionTypes.ASSIGNMENTS_REQUEST,
        payload: {},
        [WAIT_FOR_ACTION]: actionTypes.ASSIGNMENTS_REQUEST_SUCCESS,
        [ERROR_ACTION]: actionTypes.ASSIGNMENTS_REQUEST_FAILURE
    }),
    getRequestSuccess: (assignments: Array<any>) => ({
        type: actionTypes.ASSIGNMENTS_REQUEST_SUCCESS,
        payload: { assignments },
        saveReduxState: true
    }),
    getRequestFailure: (error) => ({
        type: actionTypes.ASSIGNMENTS_REQUEST_FAILURE,
        error
    }),

    getAssignmentRequest: (assignmentId) => ({
        type: actionTypes.ASSIGNMENT_REQUEST,
        payload: { assignmentId },
        [WAIT_FOR_ACTION]: actionTypes.ASSIGNMENT_REQUEST_SUCCESS,
        [ERROR_ACTION]: actionTypes.ASSIGNMENT_REQUEST_FAILURE
    }),
    getAssignmentSuccess: (assignment: any) => ({
        type: actionTypes.ASSIGNMENT_REQUEST_SUCCESS,
        payload: { assignment },
        saveReduxState: true
    }),
    getAssignmentFailure: (error) => ({
        type: actionTypes.ASSIGNMENT_REQUEST_FAILURE,
        error
    }),

    postAssignmentRequest: (assigmentData) => ({
        type: actionTypes.POST_ASSIGNMENT_REQUEST,
        payload: { assigmentData },
        [WAIT_FOR_ACTION]: actionTypes.POST_ASSIGNMENT_SUCCESS,
        [ERROR_ACTION]: actionTypes.POST_ASSIGNMENT_FAILURE
    }),
    postAssignmentSuccess: (assignment: any) => ({
        type: actionTypes.POST_ASSIGNMENT_SUCCESS,
        payload: { assignment },
        saveReduxState: true
    }),
    postAssignmentFailure: (error) => ({
        type: actionTypes.POST_ASSIGNMENT_FAILURE,
        error
    }),

    putAssignmentRequest: (assigmentData) => ({
        type: actionTypes.PUT_ASSIGNMENT_REQUEST,
        payload: { assigmentData },
        [WAIT_FOR_ACTION]: actionTypes.PUT_ASSIGNMENT_SUCCESS,
        [ERROR_ACTION]: actionTypes.PUT_ASSIGNMENT_FAILURE
    }),
    putAssignmentSuccess: (assignment: any) => ({
        type: actionTypes.PUT_ASSIGNMENT_SUCCESS,
        payload: { assignment },
        saveReduxState: true
    }),
    putAssignmentFailure: (error) => ({
        type: actionTypes.PUT_ASSIGNMENT_FAILURE,
        error
    })
};

export default {
    create: actionCreators,
    type: actionTypes
};
