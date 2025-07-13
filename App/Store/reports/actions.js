import { ERROR_ACTION, WAIT_FOR_ACTION } from "redux-wait-for-action";

export const actionTypes = {
    REPORT_ITEM_CLEAR: "REPORT_ITEM_CLEAR",
    REPORT_ITEM_SET: "REPORT_ITEM_SET",
    REPORT_ITEM_UPDATE: "REPORT_ITEM_UPDATE",

    GET_REPORTS: "GET_REPORTS",
    GET_REPORTS_SUCCESS: "GET_REPORTS_SUCCESS",
    GET_REPORTS_FAILURE: "GET_REPORTS_FAILURE",

    POST_REPORT: "POST_REPORT",
    POST_REPORT_SUCCESS: "POST_REPORT_SUCCESS",
    POST_REPORT_FAILURE: "POST_REPORT_FAILURE",

    GET_REPORT_DATA: "GET_REPORT_DATA",
    GET_REPORT_DATA_SUCCESS: "GET_REPORT_DATA_SUCCESS",
    GET_REPORT_DATA_FAILURE: "GET_REPORT_DATA_FAILURE",

    POST_REPORT_DATA: "POST_REPORT_DATA",
    POST_REPORT_DATA_SUCCESS: "POST_REPORT_DATA_SUCCESS",
    POST_REPORT_DATA_FAILURE: "POST_REPORT_DATA_FAILURE",

    PUT_REPORT_DATA: "PUT_REPORT_DATA",
    PUT_REPORT_DATA_SUCCESS: "PUT_REPORT_DATA_SUCCESS",
    PUT_REPORT_DATA_FAILURE: "PUT_REPORT_DATA_FAILURE",

    DELETE_REPORT: "DELETE_REPORT",
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

    getReports: () => ({
        type: actionTypes.GET_REPORTS,
        payload: {},
        [WAIT_FOR_ACTION]: actionTypes.GET_REPORTS_SUCCESS,
        [ERROR_ACTION]: actionTypes.GET_REPORTS_FAILURE
    }),
    getReportsSuccess: (reports: Array<any>) => ({
        type: actionTypes.GET_REPORTS_SUCCESS,
        payload: { reports },
        saveReduxState: true
    }),
    getReportsFailure: (error) => ({
        type: actionTypes.GET_REPORTS_FAILURE,
        error
    }),

    postReport: (report) => ({
        type: actionTypes.POST_REPORT,
        payload: { report },
        [WAIT_FOR_ACTION]: actionTypes.POST_REPORT_SUCCESS,
        [ERROR_ACTION]: actionTypes.POST_REPORT_FAILURE
    }),
    postReportSuccess: (report) => ({
        type: actionTypes.POST_REPORT_SUCCESS,
        payload: { report },
        saveReduxState: true
    }),
    postReportFailure: (error) => ({
        type: actionTypes.POST_REPORT_FAILURE,
        error
    }),

    getReportData: (reportId) => ({
        type: actionTypes.GET_REPORT_DATA,
        payload: { reportId },
        [WAIT_FOR_ACTION]: actionTypes.GET_REPORT_DATA_SUCCESS,
        [ERROR_ACTION]: actionTypes.GET_REPORT_DATA_FAILURE
    }),
    getReportDataSuccess: (report: any) => ({
        type: actionTypes.GET_REPORT_DATA_SUCCESS,
        payload: { report },
        saveReduxState: true
    }),
    getReportDataFailure: (error) => ({
        type: actionTypes.GET_REPORT_DATA_FAILURE,
        error
    }),

    postReportData: (reportId, reportData) => ({
        type: actionTypes.POST_REPORT_DATA,
        payload: { reportId, reportData },
        [WAIT_FOR_ACTION]: actionTypes.POST_REPORT_DATA_SUCCESS,
        [ERROR_ACTION]: actionTypes.POST_REPORT_DATA_FAILURE
    }),
    postReportDataSuccess: (report: any) => ({
        type: actionTypes.POST_REPORT_DATA_SUCCESS,
        payload: { report },
        saveReduxState: true
    }),
    postReportDataFailure: (error) => ({
        type: actionTypes.POST_REPORT_DATA_FAILURE,
        error
    }),

    putReportData: (reportId, reportData) => ({
        type: actionTypes.PUT_REPORT_DATA,
        payload: { reportId, reportData },
        [WAIT_FOR_ACTION]: actionTypes.PUT_REPORT_DATA_SUCCESS,
        [ERROR_ACTION]: actionTypes.PUT_REPORT_DATA_FAILURE
    }),
    putReportDataSuccess: (report: any) => ({
        type: actionTypes.PUT_REPORT_DATA_SUCCESS,
        payload: { report },
        saveReduxState: true
    }),
    putReportDataFailure: (error) => ({
        type: actionTypes.PUT_REPORT_DATA_FAILURE,
        error
    }),

    // Delete report data
    deleteReport: (reportId) => ({
        type: actionTypes.DELETE_REPORT,
        payload: { reportId },
        [WAIT_FOR_ACTION]: actionTypes.DELETE_REPORT_SUCCESS,
        [ERROR_ACTION]: actionTypes.DELETE_REPORT_FAILURE
    }),
    deleteReportSuccess: (reportId: any) => ({
        type: actionTypes.DELETE_REPORT_SUCCESS,
        payload: { reportId },
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
