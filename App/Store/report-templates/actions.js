import { ERROR_ACTION, WAIT_FOR_ACTION } from "redux-wait-for-action";

export const actionTypes = {
    TEMPLATE_ITEM_CLEAR: "TEMPLATE_ITEM_CLEAR",
    TEMPLATE_ITEM_SET: "TEMPLATE_ITEM_SET",
    TEMPLATE_ITEM_UPDATE: "TEMPLATE_ITEM_UPDATE",

    TEMPLATES_REQUEST: "TEMPLATES_REQUEST",
    TEMPLATES_REQUEST_SUCCESS: "TEMPLATES_REQUEST_SUCCESS",
    TEMPLATES_REQUEST_FAILURE: "TEMPLATES_REQUEST_FAILURE",

    TEMPLATE_REQUEST: "TEMPLATE_REQUEST",
    TEMPLATE_REQUEST_SUCCESS: "TEMPLATE_REQUEST_SUCCESS",
    TEMPLATE_REQUEST_FAILURE: "TEMPLATE_REQUEST_FAILURE",

    POST_TEMPLATE_REQUEST: "POST_TEMPLATE_REQUEST",
    POST_TEMPLATE_SUCCESS: "POST_TEMPLATE_SUCCESS",
    POST_TEMPLATE_FAILURE: "POST_TEMPLATE_FAILURE",

    PUT_TEMPLATE_REQUEST: "PUT_TEMPLATE_REQUEST",
    PUT_TEMPLATE_SUCCESS: "PUT_TEMPLATE_SUCCESS",
    PUT_TEMPLATE_FAILURE: "PUT_TEMPLATE_FAILURE",

    DELETE_TEMPLATE_REQUEST: "DELETE_TEMPLATE_REQUEST",
    DELETE_TEMPLATE_SUCCESS: "DELETE_TEMPLATE_SUCCESS",
    DELETE_TEMPLATE_FAILURE: "DELETE_TEMPLATE_FAILURE"
};

export const actionCreators = {
    itemClear: () => ({
        type: actionTypes.TEMPLATE_ITEM_CLEAR,
        saveReduxState: true
    }),
    itemSet: (template: any) => ({
        type: actionTypes.TEMPLATE_ITEM_SET,
        payload: { template },
        saveReduxState: true
    }),
    itemUpdate: (section: String, data: any) => ({
        type: actionTypes.TEMPLATE_ITEM_UPDATE,
        payload: { section, data },
        saveReduxState: true
    }),

    getRequest: () => ({
        type: actionTypes.TEMPLATES_REQUEST,
        payload: {},
        [WAIT_FOR_ACTION]: actionTypes.TEMPLATES_REQUEST_SUCCESS,
        [ERROR_ACTION]: actionTypes.TEMPLATES_REQUEST_FAILURE
    }),
    getRequestSuccess: (templates: Array<any>) => ({
        type: actionTypes.TEMPLATES_REQUEST_SUCCESS,
        payload: { templates },
        saveReduxState: true
    }),
    getRequestFailure: (error) => ({
        type: actionTypes.TEMPLATES_REQUEST_FAILURE,
        error
    }),

    getTemplateRequest: (templateId) => ({
        type: actionTypes.TEMPLATE_REQUEST,
        payload: { templateId },
        [WAIT_FOR_ACTION]: actionTypes.TEMPLATE_REQUEST_SUCCESS,
        [ERROR_ACTION]: actionTypes.TEMPLATE_REQUEST_FAILURE
    }),
    getTemplateSuccess: (template: any) => ({
        type: actionTypes.TEMPLATE_REQUEST_SUCCESS,
        payload: { template },
        saveReduxState: true
    }),
    getTemplateFailure: (error) => ({
        type: actionTypes.TEMPLATE_REQUEST_FAILURE,
        error
    }),

    postTemplateRequest: (templateData) => ({
        type: actionTypes.POST_TEMPLATE_REQUEST,
        payload: { templateData },
        [WAIT_FOR_ACTION]: actionTypes.POST_TEMPLATE_SUCCESS,
        [ERROR_ACTION]: actionTypes.POST_TEMPLATE_FAILURE
    }),
    postTemplateSuccess: (template: any) => ({
        type: actionTypes.POST_TEMPLATE_SUCCESS,
        payload: { template },
        saveReduxState: true
    }),
    postTemplateFailure: (error) => ({
        type: actionTypes.POST_TEMPLATE_FAILURE,
        error
    }),

    putTemplateRequest: (templateId, newTemplate) => ({
        type: actionTypes.PUT_TEMPLATE_REQUEST,
        payload: { templateId, newTemplate },
        [WAIT_FOR_ACTION]: actionTypes.PUT_TEMPLATE_SUCCESS,
        [ERROR_ACTION]: actionTypes.PUT_TEMPLATE_FAILURE
    }),
    putTemplateSuccess: (template: any) => ({
        type: actionTypes.PUT_TEMPLATE_SUCCESS,
        payload: { template },
        saveReduxState: true
    }),
    putTemplateFailure: (error) => ({
        type: actionTypes.PUT_TEMPLATE_FAILURE,
        error
    }),

    deleteTemplateRequest: (templateId) => ({
        type: actionTypes.DELETE_TEMPLATE_REQUEST,
        payload: { templateId },
        [WAIT_FOR_ACTION]: actionTypes.DELETE_TEMPLATE_SUCCESS,
        [ERROR_ACTION]: actionTypes.DELETE_TEMPLATE_FAILURE
    }),
    deleteTemplateSuccess: (templateId: any) => ({
        type: actionTypes.DELETE_TEMPLATE_SUCCESS,
        payload: { templateId },
        saveReduxState: true
    }),
    deleteTemplateFailure: (error) => ({
        type: actionTypes.DELETE_TEMPLATE_FAILURE,
        error
    })
};

export default {
    create: actionCreators,
    type: actionTypes
};
