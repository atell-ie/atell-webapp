import { ERROR_ACTION, WAIT_FOR_ACTION } from "redux-wait-for-action";

export const actionTypes = {
    WORDS_ERRORS_GET: "WORDS_ERRORS_GET",
    WORDS_ERRORS_GET_SUCCESS: "WORDS_ERRORS_GET_SUCCESS",
    WORDS_ERRORS_GET_FAILURE: "WORDS_ERRORS_GET_FAILURE",

    ANALYSIS_RESULT_WORD_IPA_BULK_UPSERT:
        "ANALYSIS_RESULT_WORD_IPA_BULK_UPSERT",
    ANALYSIS_RESULT_WORD_IPA_BULK_UPSERT_SUCCESS:
        "ANALYSIS_RESULT_WORD_IPA_BULK_UPSERT_SUCCESS",
    ANALYSIS_RESULT_WORD_IPA_BULK_UPSERT_FAILURE:
        "ANALYSIS_RESULT_WORD_IPA_BULK_UPSERT_FAILURE"
};

export const actionCreators = {
    getWordErrors: (sessionId: integer) => ({
        type: actionTypes.WORDS_ERRORS_GET,
        payload: { sessionId },
        [WAIT_FOR_ACTION]: actionTypes.WORDS_ERRORS_GET_SUCCESS,
        [ERROR_ACTION]: actionTypes.WORDS_ERRORS_GET_FAILURE
    }),
    getWordErrorsSuccess: (resultIpas: any) => ({
        type: actionTypes.WORDS_ERRORS_GET_SUCCESS,
        payload: { resultIpas },
        saveReduxState: true
    }),
    getWordErrorsFailure: (error: Error) => ({
        type: actionTypes.WORDS_ERRORS_GET_FAILURE,
        error
    }),

    updateAnalysisResultWordIpa: (resultIpas: any) => ({
        type: actionTypes.ANALYSIS_RESULT_WORD_IPA_BULK_UPSERT,
        payload: { resultIpas },
        [WAIT_FOR_ACTION]:
            actionTypes.ANALYSIS_RESULT_WORD_IPA_BULK_UPSERT_SUCCESS,
        [ERROR_ACTION]: actionTypes.ANALYSIS_RESULT_WORD_IPA_BULK_UPSERT_FAILURE
    }),
    updateAnalysisResultWordIpaSuccess: (resultIpas: any) => ({
        type: actionTypes.ANALYSIS_RESULT_WORD_IPA_BULK_UPSERT_SUCCESS,
        payload: { resultIpas },
        saveReduxState: true
    }),
    updateAnalysisResultWordIpaFailure: (error: Error) => ({
        type: actionTypes.ANALYSIS_RESULT_WORD_IPA_BULK_UPSERT_FAILURE,
        error
    })
};

export default {
    create: actionCreators,
    type: actionTypes
};
