import { all, call, put, takeLatest } from "redux-saga/effects";
import { actionCreators, actionTypes } from "./actions";
import { http } from "../../common/lib";
import config from "../../config";

function* getResults(action) {
    const { sessionId } = action.payload;
    const url = `${config.api.baseUrl}/${config.api.urls.analysisResults}?session_id=${sessionId}`;

    try {
        const { data } = yield call(http.authorized.get, url);
        yield put(actionCreators.getResultsSuccess(data));
    } catch (error) {
        yield put(actionCreators.getResultsFailure(error.toString()));
    }
}

function* patchResults(action) {
    const { updData } = action.payload;
    const url = `${config.api.baseUrl}/${config.api.urls.analysisResults}bulk-update/`;

    try {
        const { data } = yield call(http.authorized.patch, url, updData);
        yield put(actionCreators.patchResultsSuccess(data));
    } catch (error) {
        yield put(actionCreators.patchResultsFailure(error.toString()));
    }
}

function* patchResultTarget(action) {
    const { updData, resultTargetId } = action.payload;
    const url = `${config.api.baseUrl}/${config.api.urls.analysisResults}${resultTargetId}/`;

    try {
        const { data } = yield call(http.authorized.patch, url, updData);
        yield put(actionCreators.patchResultTargetSuccess(data));
    } catch (error) {
        yield put(actionCreators.patchResultTargetFailure(error.toString()));
    }
}

export { getResults, patchResults };

export default (function* () {
    yield all([
        takeLatest(actionTypes.GET_RESULTS, getResults),
        takeLatest(actionTypes.PATCH_RESULTS, patchResults),
        takeLatest(actionTypes.PATCH_RESULT_TARGET, patchResultTarget)
    ]);
})();
