import { ERROR_ACTION, WAIT_FOR_ACTION } from "redux-wait-for-action";

export const actionTypes = {
    WORDS_GET_FAILURE: "WORDS_GET_FAILURE",
    WORDS_GET_REQUEST: "WORDS_GET_REQUEST",
    WORDS_GET_SUCCESS: "WORDS_GET_SUCCESS",

    WORD_POST_FAILURE: "WORD_POST_FAILURE",
    WORD_POST_REQUEST: "WORD_POST_REQUEST",
    WORD_POST_SUCCESS: "WORD_POST_SUCCESS"
};

export const actionCreators = {
    getWordsRequest: () => ({
        type: actionTypes.WORDS_GET_REQUEST,
        payload: {},
        [WAIT_FOR_ACTION]: actionTypes.WORDS_GET_SUCCESS,
        [ERROR_ACTION]: actionTypes.WORDS_GET_FAILURE
    }),
    getWordsSuccess: (data: any) => ({
        type: actionTypes.WORDS_GET_SUCCESS,
        payload: data,
        saveReduxState: true
    }),
    getWordsFailure: (error: Error) => ({
        type: actionTypes.WORDS_GET_FAILURE,
        error
    }),

    postNewWord: (newWord) => ({
        type: actionTypes.WORD_POST_REQUEST,
        payload: { newWord },
        [WAIT_FOR_ACTION]: actionTypes.WORD_POST_SUCCESS,
        [ERROR_ACTION]: actionTypes.WORD_POST_FAILURE
    }),
    postNewWordSuccess: (data: any) => ({
        type: actionTypes.WORD_POST_SUCCESS,
        payload: data,
        saveReduxState: true
    }),
    postNewWordFailure: (error: Error) => ({
        type: actionTypes.WORD_POST_FAILURE,
        error
    })
};

export default {
    create: actionCreators,
    type: actionTypes
};
