import { all, call, put, takeLatest } from "redux-saga/effects";
import { actionCreators, actionTypes } from "./actions";
import config from "../../config";
import { http } from "../../common/lib";

function* getSessions(action) {
    const { journeyId } = action.payload;
    const url = `${config.api.baseUrl}/${config.api.urls.sessions}?journey_id=${journeyId}`;

    try {
        const { data } = yield call(http.authorized.get, url);

        yield put(actionCreators.getSessionsSuccess(data));
    } catch (error) {
        yield put(actionCreators.getSessionsFailure(error.toString()));
    }
}

function* getSessionById(action) {
    const { id } = action.payload;
    const url = `${config.api.baseUrl}/${config.api.urls.sessions}?id=${id}`;

    try {
        const { data } = yield call(http.authorized.get, url);

        yield put(actionCreators.getSessionByIdSuccess(data));
    } catch (error) {
        yield put(actionCreators.getSessionByIdFailure(error.toString()));
    }
}

function* postSession(action) {
    const { sessionData } = action.payload;
    const url = `${config.api.baseUrl}/${config.api.urls.sessions}`;

    console.log("sessionData", sessionData);

    try {
        const { data } = yield call(http.authorized.postForm, url, sessionData);
        yield put(actionCreators.postSessionsSuccess(data));
    } catch (error) {
        yield put(actionCreators.postSessionsFailure(error.toString()));
    }
}

function* putSession(action) {
    const { sessionData } = action.payload;
    const url = `${config.api.baseUrl}/${config.api.urls.sessions}`;

    try {
        const { data } = yield call(http.authorized.put, url, sessionData);
        yield put(actionCreators.putSessionsSuccess(data));
    } catch (error) {
        yield put(actionCreators.putSessionsFailure(error.toString()));
    }
}

export default (function* () {
    yield all([takeLatest(actionTypes.SESSIONS_GET, getSessions)]);
    yield all([takeLatest(actionTypes.SESSION_GET, getSessionById)]);
    yield all([takeLatest(actionTypes.SESSIONS_POST, postSession)]);
    yield all([takeLatest(actionTypes.SESSIONS_PUT, putSession)]);
})();
