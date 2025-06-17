import { all, put, takeLatest } from "redux-saga/effects";
import { actionCreators, actionTypes } from "./actions";
import { http } from "../../common/lib";
import config from "../../config";

import targetsData from "./targetsData";

function* getRequest(action) {
    // const {  } = action.payload;
    try {
        //const { data } = yield call(http.authorized.get, config.api.paths.tasks);

        yield put(actionCreators.getRequestSuccess(targetsData));
    } catch (error) {
        yield put(actionCreators.getRequestFailure(error.toString()));
    }
}

function* getTargetRequest(action) {
    const { targetId } = action.payload;
    try {
        //const { data } = yield call(http.authorized.get, config.api.paths.tasks);

        yield put(actionCreators.getReportRequestSuccess(targetsData));
    } catch (error) {
        yield put(actionCreators.getReportRequestFailure(error.toString()));
    }
}

export { getRequest, getTargetRequest };

export default (function* () {
    yield all([
        takeLatest(actionTypes.TARGETS_REQUEST, getRequest),
        takeLatest(actionTypes.TARGET_REQUEST, getTargetRequest)
    ]);
})();
