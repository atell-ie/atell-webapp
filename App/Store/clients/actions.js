import { ERROR_ACTION, WAIT_FOR_ACTION } from "redux-wait-for-action";

export const actionTypes = {
    CLIENTS_ITEM_CLEAR: "CLIENTS_ITEM_CLEAR",
    CLIENTS_ITEM_SET: "CLIENTS_ITEM_SET",

    CLIENTS_GET: "CLIENTS_GET",
    CLIENTS_GET_SUCCESS: "CLIENTS_GET_SUCCESS",
    CLIENTS_GET_FAILURE: "CLIENTS_GET_FAILURE",

    CLIENTS_POST: "CLIENTS_POST",
    CLIENTS_POST_SUCCESS: "CLIENTS_POST_SUCCESS",
    CLIENTS_POST_FAILURE: "CLIENTS_POST_FAILURE",

    CLIENTS_PUT: "CLIENTS_PUT",
    CLIENTS_PUT_SUCCESS: "CLIENTS_PUT_SUCCESS",
    CLIENTS_PUT_FAILURE: "CLIENTS_PUT_FAILURE",
};  

export const actionCreators = {
    itemClear: () => ({
        type: actionTypes.CLIENTS_ITEM_CLEAR,
        saveReduxState: true
    }),
    itemSet: (audit: any) => ({
        type: actionTypes.CLIENTS_ITEM_SET,
        payload: { audit },
        saveReduxState: true
    }),

    getClients: () => ({
        type: actionTypes.CLIENTS_GET,
        payload: { },
        [WAIT_FOR_ACTION]: actionTypes.CLIENTS_GET_SUCCESS,
        [ERROR_ACTION]: actionTypes.CLIENTS_GET_FAILURE
    }),
    getClientsSuccess: (clients: any) => ({
        type: actionTypes.CLIENTS_GET_SUCCESS,
        payload: { clients },
        saveReduxState: true
    }),
    getClientsFailure: (error: Error) => ({
        type: actionTypes.CLIENTS_GET_FAILURE,
        error
    }),

    postClients: (clientData: any) => ({
        type: actionTypes.CLIENTS_POST,
        payload: { clientData },
        [WAIT_FOR_ACTION]: actionTypes.CLIENTS_POST_SUCCESS,
        [ERROR_ACTION]: actionTypes.CLIENTS_POST_FAILURE
    }),     
    postClientsSuccess: (newClientData: any) => ({
        type: actionTypes.CLIENTS_POST_SUCCESS,
        payload: { newClientData },
        saveReduxState: true
    }),
    postClientsFailure: (error: Error) => ({
        type: actionTypes.CLIENTS_POST_FAILURE,
        error
    }),

    putClients: (clientData: any) => ({
        type: actionTypes.CLIENTS_PUT,
        payload: { clientData },
        [WAIT_FOR_ACTION]: actionTypes.CLIENTS_PUT_SUCCESS,
        [ERROR_ACTION]: actionTypes.CLIENTS_PUT_FAILURE
    }),
    putClientsSuccess: (updatedClientData: any) => ({
        type: actionTypes.CLIENTS_PUT_SUCCESS,
        payload: { updatedClientData },
        saveReduxState: true
    }),
    putClientsFailure: (error: Error) => ({
        type: actionTypes.CLIENTS_PUT_FAILURE,
        error
    }),
}
export default {
    create: actionCreators,
    type: actionTypes
};
