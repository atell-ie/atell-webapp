import { all, call, put, takeLatest } from "redux-saga/effects";
import { actionCreators, actionTypes } from "./actions";
import { http } from "../../common/lib";
import config from "../../config";

function* getWordsList(action) {
    // TODO: left for future proof
    // const { deviceId } = action.payload;

    const url = `${config.api.baseUrl}${config.api.urls.words}`;

    try {
        const { data } = yield call(http.authorized.get, url);
        yield put(actionCreators.getWordsSuccess(data));
    } catch (error) {
        yield put(actionCreators.getWordsFailure(error.toString()));
    }
}

function* postNewWord(action) {
    const { newWord } = action.payload;
    const url = `${config.api.baseUrl}${config.api.urls.words}`;

    const newData = {
        word: newWord,
        language: "English"
    };

    try {
        const { data } = yield call(http.authorized.post, url, newData);
        yield put(actionCreators.postNewWordSuccess(data));
    } catch (error) {
        yield put(actionCreators.postNewWordFailure(error.toString()));
    }
}

export { getWordsList, postNewWord };

export default (function* () {
    yield all([takeLatest(actionTypes.WORDS_GET_REQUEST, getWordsList)]);
    yield all([takeLatest(actionTypes.WORD_POST_REQUEST, postNewWord)]);
})();
