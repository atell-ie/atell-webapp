import { ERROR_ACTION, WAIT_FOR_ACTION } from "redux-wait-for-action";

export const actionTypes = {
    REPORT_ITEM_CLEAR: "REPORT_ITEM_CLEAR",
    REPORT_ITEM_SET: "REPORT_ITEM_SET",
    REPORT_ITEM_UPDATE: "REPORT_ITEM_UPDATE",

    REPORTS_REQUEST: "REPORTS_REQUEST",
    REPORTS_REQUEST_SUCCESS: "REPORTS_REQUEST_SUCCESS",
    REPORTS_REQUEST_FAILURE: "REPORTS_REQUEST_FAILURE",

    REPORT_REQUEST: "REPORT_REQUEST",
    REPORT_REQUEST_SUCCESS: "REPORT_REQUEST_SUCCESS",
    REPORT_REQUEST_FAILURE: "REPORT_REQUEST_FAILURE",

    POST_REPORT_REQUEST: "POST_REPORT_REQUEST",
    POST_REPORT_SUCCESS: "POST_REPORT_SUCCESS",
    POST_REPORT_FAILURE: "POST_REPORT_FAILURE",

    PUT_REPORT_REQUEST: "PUT_REPORT_REQUEST",
    PUT_REPORT_SUCCESS: "PUT_REPORT_SUCCESS",
    PUT_REPORT_FAILURE: "PUT_REPORT_FAILURE",

    DELETE_REPORT_REQUEST: "DELETE_REPORT_REQUEST",
    DELETE_REPORT_SUCCESS: "DELETE_REPORT_SUCCESS",
    DELETE_REPORT_FAILURE: "DELETE_REPORT_FAILURE"
};

export const actionCreators = {
    itemClear: () => ({
        type: actionTypes.REPORT_ITEM_CLEAR,
        saveReduxState: true
    }),
    itemSet: (report: any) => ({
        type: actionTypes.REPORT_ITEM_SET,
        payload: { report },
        saveReduxState: true
    }),
    itemUpdate: (section: String, data: any) => ({
        type: actionTypes.REPORT_ITEM_UPDATE,
        payload: { section, data },
        saveReduxState: true
    }),

    getRequest: () => ({
        type: actionTypes.REPORTS_REQUEST,
        payload: {},
        [WAIT_FOR_ACTION]: actionTypes.REPORTS_REQUEST_SUCCESS,
        [ERROR_ACTION]: actionTypes.REPORTS_REQUEST_FAILURE
    }),
    getRequestSuccess: (reports: Array<any>) => ({
        type: actionTypes.REPORTS_REQUEST_SUCCESS,
        payload: { reports },
        saveReduxState: true
    }),
    getRequestFailure: (error) => ({
        type: actionTypes.REPORTS_REQUEST_FAILURE,
        error
    }),

    getReportRequest: (reportId) => ({
        type: actionTypes.REPORT_REQUEST,
        payload: { reportId },
        [WAIT_FOR_ACTION]: actionTypes.REPORT_REQUEST_SUCCESS,
        [ERROR_ACTION]: actionTypes.REPORT_REQUEST_FAILURE
    }),
    getReportRequestSuccess: (report: any) => ({
        type: actionTypes.REPORT_REQUEST_SUCCESS,
        payload: { report },
        saveReduxState: true
    }),
    getReportRequestFailure: (error) => ({
        type: actionTypes.REPORT_REQUEST_FAILURE,
        error
    }),

    postReportRequest: (reportData) => ({
        type: actionTypes.POST_REPORT_REQUEST,
        payload: { reportData },
        [WAIT_FOR_ACTION]: actionTypes.POST_REPORT_SUCCESS,
        [ERROR_ACTION]: actionTypes.POST_REPORT_FAILURE
    }),
    postReportSuccess: (report: any) => ({
        type: actionTypes.POST_REPORT_SUCCESS,
        payload: { report },
        saveReduxState: true
    }),
    postReportFailure: (error) => ({
        type: actionTypes.POST_REPORT_FAILURE,
        error
    }),

    putReportRequest: (reportId, newReport) => ({
        type: actionTypes.PUT_REPORT_REQUEST,
        payload: { reportId, newReport },
        [WAIT_FOR_ACTION]: actionTypes.PUT_REPORT_SUCCESS,
        [ERROR_ACTION]: actionTypes.PUT_REPORT_FAILURE
    }),
    putReportSuccess: (report: any) => ({
        type: actionTypes.PUT_REPORT_SUCCESS,
        payload: { report },
        saveReduxState: true
    }),
    putReportFailure: (error) => ({
        type: actionTypes.PUT_REPORT_FAILURE,
        error
    }),

    deleteReportRequest: (reportId) => ({
        type: actionTypes.DELETE_REPORT_REQUEST,
        payload: { reportId },
        [WAIT_FOR_ACTION]: actionTypes.DELETE_REPORT_SUCCESS,
        [ERROR_ACTION]: actionTypes.DELETE_REPORT_FAILURE
    }),
    deleteReportSuccess: (report: any) => ({
        type: actionTypes.DELETE_REPORT_SUCCESS,
        payload: { report },
        saveReduxState: true
    }),
    deleteReportFailure: (error) => ({
        type: actionTypes.DELETE_REPORT_FAILURE,
        error
    })
};

export default {
    create: actionCreators,
    type: actionTypes
};
