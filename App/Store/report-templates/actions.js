import { ERROR_ACTION, WAIT_FOR_ACTION } from "redux-wait-for-action";

export const actionTypes = {
    TEMPLATE_ITEM_CLEAR: "TEMPLATE_ITEM_CLEAR",
    TEMPLATE_ITEM_SET: "TEMPLATE_ITEM_SET",
    TEMPLATE_ITEM_UPDATE: "TEMPLATE_ITEM_UPDATE",

    GET_TEMPLATES: "GET_TEMPLATES",
    GET_TEMPLATES_SUCCESS: "GET_TEMPLATES_SUCCESS",
    GET_TEMPLATES_FAILURE: "GET_TEMPLATES_FAILURE",

    GET_TEMPLATE_CONTENT: "GET_TEMPLATE_CONTENT",
    GET_TEMPLATE_CONTENT_SUCCESS: "GET_TEMPLATE_CONTENT_SUCCESS",
    GET_TEMPLATE_CONTENT_FAILURE: "GET_TEMPLATE_CONTENT_FAILURE",

    POST_TEMPLATE: "POST_TEMPLATE",
    POST_TEMPLATE_SUCCESS: "POST_TEMPLATE_SUCCESS",
    POST_TEMPLATE_FAILURE: "POST_TEMPLATE_FAILURE",

    PUT_TEMPLATE_CONTENT: "PUT_TEMPLATE_CONTENT",
    PUT_TEMPLATE_CONTENT_SUCCESS: "PUT_TEMPLATE_CONTENT_SUCCESS",
    PUT_TEMPLATE_CONTENT_FAILURE: "PUT_TEMPLATE_CONTENT_FAILURE",

    DELETE_TEMPLATE: "DELETE_TEMPLATE",
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

    getTemplates: () => ({
        type: actionTypes.GET_TEMPLATES,
        payload: {},
        [WAIT_FOR_ACTION]: actionTypes.GET_TEMPLATES_SUCCESS,
        [ERROR_ACTION]: actionTypes.GET_TEMPLATES_FAILURE
    }),
    getTemplatesSuccess: (templates: Array<any>) => ({
        type: actionTypes.GET_TEMPLATES_SUCCESS,
        payload: { templates },
        saveReduxState: true
    }),
    getTemplatesFailure: (error) => ({
        type: actionTypes.GET_TEMPLATES_FAILURE,
        error
    }),

    postTemplate: (template) => ({
        type: actionTypes.POST_TEMPLATE,
        payload: { template },
        [WAIT_FOR_ACTION]: actionTypes.POST_TEMPLATE_SUCCESS,
        [ERROR_ACTION]: actionTypes.POST_TEMPLATE_FAILURE
    }),
    postTemplateSuccess: (template) => ({
        type: actionTypes.POST_TEMPLATE_SUCCESS,
        payload: { template },
        saveReduxState: true
    }),
    postTemplateFailure: (error: any) => ({
        type: actionTypes.POST_TEMPLATE_FAILURE,
        error
    }),

    getTemplateContent: (templateId) => ({
        type: actionTypes.GET_TEMPLATE_CONTENT,
        payload: { templateId },
        [WAIT_FOR_ACTION]: actionTypes.GET_TEMPLATE_CONTENT_SUCCESS,
        [ERROR_ACTION]: actionTypes.GET_TEMPLATE_CONTENT_FAILURE
    }),
    getTemplateContentSuccess: (template) => ({
        type: actionTypes.GET_TEMPLATE_CONTENT_SUCCESS,
        payload: { template },
        saveReduxState: true
    }),
    getTemplateContentFailure: (error: any) => ({
        type: actionTypes.GET_TEMPLATE_CONTENT_FAILURE,
        error
    }),

    putTemplateContent: (templateId, template) => ({
        type: actionTypes.PUT_TEMPLATE_CONTENT,
        payload: { templateId, template },
        [WAIT_FOR_ACTION]: actionTypes.PUT_TEMPLATE_CONTENT_SUCCESS,
        [ERROR_ACTION]: actionTypes.PUT_TEMPLATE_CONTENT_FAILURE
    }),
    putTemplateContentSuccess: (template) => ({
        type: actionTypes.PUT_TEMPLATE_CONTENT_SUCCESS,
        payload: { template },
        saveReduxState: true
    }),
    putTemplateContentFailure: (error) => ({
        type: actionTypes.PUT_TEMPLATE_CONTENT_FAILURE,
        error
    }),

    deleteTemplate: (templateId) => ({
        type: actionTypes.DELETE_TEMPLATE,
        payload: { templateId },
        [WAIT_FOR_ACTION]: actionTypes.DELETE_TEMPLATE_SUCCESS,
        [ERROR_ACTION]: actionTypes.DELETE_TEMPLATE_FAILURE
    }),
    deleteTemplateSuccess: (templateId) => ({
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
