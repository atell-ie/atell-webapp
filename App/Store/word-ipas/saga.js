import { all, call, put, takeLatest } from "redux-saga/effects";
import { actionCreators, actionTypes } from "./actions";
import { http } from "../../common/lib";
import config from "../../config";

function* getIpas(action) {
    const { targetWordIds } = action.payload;
    const url = `${config.api.baseUrl}${config.api.urls.wordIpas}?word_ids=${targetWordIds}`;

    try {
        const { data } = yield call(http.authorized.get, url);
        yield put(actionCreators.getWordIpasSuccess(data));
    } catch (error) {
        yield put(actionCreators.getWordIpasFailure(error.toString()));
    }
}

export { getIpas };

export default (function* () {
    yield all([takeLatest(actionTypes.GET_WORD_IPAS, getIpas)]);
})();
