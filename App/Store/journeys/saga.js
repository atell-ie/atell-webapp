import { all, call, put, takeLatest } from "redux-saga/effects";
import { actionCreators, actionTypes } from "./actions";
import config from "../../config";
import { http } from "../../common/lib";


function* getJourneys(action) {
    const url = `${config.api.baseUrl}/${config.api.urls.journeys}`;

    try {
        const { data } = yield call(http.authorized.get, url);

        yield put(actionCreators.getJourneysSuccess(data));
    } catch (error) {
        yield put(actionCreators.getJourneysFailure(error.toString()));
    }
}

function* postJourney(action) {
    const { journeyData } = action.payload;
    const url = `${config.api.baseUrl}/${config.api.urls.journeys}`;

    try {
        const { data } = yield call(http.authorized.post, url, journeyData);
        yield put(actionCreators.postJourneysSuccess(data));
    } catch (error) {
        yield put(actionCreators.postJourneysFailure(error.toString()));
    }
}

function* putJourney(action) {
    const { journeyId, journeyData } = action.payload;
    const url = `${config.api.baseUrl}/${config.api.urls.journeys}${journeyId}/`;

    try {
        const { data } = yield call(http.authorized.put, url, journeyData);
        yield put(actionCreators.putJourneysSuccess(data));
    } catch (error) {
        yield put(actionCreators.putJourneysFailure(error.toString()));
    }
}


export default (function* () {
    yield all([takeLatest(actionTypes.JOURNEYS_GET, getJourneys)]);
    yield all([takeLatest(actionTypes.JOURNEYS_POST, postJourney)]);
    yield all([takeLatest(actionTypes.JOURNEYS_PUT, putJourney)]);
})();
