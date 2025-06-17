import { ERROR_ACTION, WAIT_FOR_ACTION } from "redux-wait-for-action";

export const actionTypes = {
    GET_WORD_IPAS: "GET_WORD_IPAS",
    GET_WORD_IPAS_SUCCESS: "GET_WORD_IPAS_SUCCESS",
    GET_WORD_IPAS_FAILURE: "GET_WORD_IPAS_FAILURE"
};

export const actionCreators = {
    getWordIpas: (targetWordIds: inteteger) => ({
        type: actionTypes.GET_WORD_IPAS,
        payload: { targetWordIds },
        [WAIT_FOR_ACTION]: actionTypes.GET_WORD_IPAS_SUCCESS,
        [ERROR_ACTION]: actionTypes.GET_WORD_IPAS_FAILURE
    }),
    getWordIpasSuccess: (ipasData: any) => ({
        type: actionTypes.GET_WORD_IPAS_SUCCESS,
        payload: { ipasData },
        saveReduxState: true
    }),
    getWordIpasFailure: (error: Error) => ({
        type: actionTypes.GET_WORD_IPAS_FAILURE,
        error
    })
};

export default {
    create: actionCreators,
    type: actionTypes
};
