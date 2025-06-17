import { all, call, put, takeLatest } from "redux-saga/effects";
import { actionCreators, actionTypes } from "./actions";
import { http } from "../../common/lib";
import config from "../../config";

function* getList(action) {
    // const { deviceId } = action.payload;
    const url = `${config.api.baseUrl}/${config.api.urls.targetWordsList}`;

    try {
        const { data } = yield call(http.authorized.get, url);
        yield put(actionCreators.getTargetListSuccess(data));
    } catch (error) {
        yield put(actionCreators.getTargetListFailure(error.toString()));
    }
}

function* postList(action) {
    const { newWordsList } = action.payload;
    const url = `${config.api.baseUrl}/${config.api.urls.targetWordsList}/`;

    try {
        const { data } = yield call(http.authorized.post, url, newWordsList);
        yield put(actionCreators.postTargetListSuccess(data));
    } catch (error) {
        yield put(actionCreators.postTargetListFailure(error.toString()));
    }
}

function* putList(action) {
    const { wordListId, updWordsList } = action.payload;
    const url = `${config.api.baseUrl}/${config.api.urls.targetWordsList}/${wordListId}/`;

    const postData = {
        name: updWordsList.name,
        description: updWordsList.description,
        words: updWordsList.words.map((item) => ({
            id: item.id,
            noOfInstances: item.noOfInstances
        }))
    };

    try {
        yield call(http.authorized.put, url, postData);
        yield put(
            actionCreators.putTargetListSuccess(wordListId, updWordsList)
        );
    } catch (error) {
        yield put(actionCreators.putTargetListFailure(error.toString()));
    }
    }

function* deleteList(action) {
    const { wordListId } = action.payload;
    const url = `${config.api.baseUrl}/${config.api.urls.targetWordsList}/${wordListId}/`;

    try {
        yield call(http.authorized.delete, url);        
        yield put(actionCreators.deleteTargetListSuccess(wordListId));
    } catch (error) {
        yield put(actionCreators.deleteTargetListFailure(error.toString()));
    }
}

export { getList, postList, putList, deleteList };

export default (function* () {
    yield all([takeLatest(actionTypes.TARGET_LISTS_GET, getList)]);
    yield all([takeLatest(actionTypes.TARGET_LIST_POST, postList)]);
    yield all([takeLatest(actionTypes.TARGET_LIST_PUT, putList)]);
    yield all([takeLatest(actionTypes.TARGET_LIST_DELETE, deleteList)]);
})();
