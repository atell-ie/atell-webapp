import { all, put, takeLatest } from "redux-saga/effects";
import { actionCreators, actionTypes } from "./actions";
import { http } from "../../common/lib";
import config from "../../config";

import blocks from "./TestData/blocks";

function* getRequest(action) {
    try {
        //const { data } = yield call(http.authorized.get, `${config.api.paths.tasks}/${blockId}`);
        yield put(actionCreators.getRequestSuccess(blocks.data));
    } catch (error) {
        yield put(actionCreators.getRequestFailure(error.toString()));
    }
}

function* getBlockRequest(action) {
    const { blockId } = action.payload;
    try {
        //const { data } = yield call(http.authorized.get, config.api.paths.tasks);

        yield put(actionCreators.getBlockRequestSuccess(undefined, blockId));
    } catch (error) {
        yield put(actionCreators.getBlockRequestFailure(error.toString()));
    }
}

export { getRequest, getBlockRequest };

export default (function* () {
    yield all([
        takeLatest(actionTypes.BLOCKS_REQUEST, getRequest),
        takeLatest(actionTypes.BLOCK_REQUEST, getBlockRequest)
    ]);
})();
