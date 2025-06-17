import { all, call, put, takeLatest } from "redux-saga/effects";
import { actionCreators, actionTypes } from "./actions";
import { http } from "../../common/lib";
import config from "../../config";

function* getWordErrors(action) {
    const { sessionId } = action.payload;
    const url = `${config.api.baseUrl}/${config.api.urls.analysisResultWordIpas}?session_id=${sessionId}`;

    try {
        const { data } = yield call(http.authorized.get, url);
        yield put(actionCreators.getWordErrorsSuccess(data));
    } catch (error) {
        yield put(actionCreators.getWordErrorsFailure(error.toString()));
    }
}

function* updateAnalysisResultWordIpa(action) {
    const { resultIpas } = action.payload;
    const url = `${config.api.baseUrl}/${config.api.urls.analysisResultWordIpas}bulk-upsert/`;

    try {
        yield put(
            actionCreators.updateAnalysisResultWordIpaSuccess([resultIpas])
        );
        const { data } = yield call(http.authorized.put, url, resultIpas);
        yield put(actionCreators.updateAnalysisResultWordIpaSuccess(data));
    } catch (error) {
        yield put(
            actionCreators.updateAnalysisResultWordIpaFailure(error.toString())
        );
    }
}

export default (function* () {
    yield all([
        takeLatest(actionTypes.WORDS_ERRORS_GET, getWordErrors),
        takeLatest(
            actionTypes.ANALYSIS_RESULT_WORD_IPA_BULK_UPSERT,
            updateAnalysisResultWordIpa
        )
    ]);
})();
