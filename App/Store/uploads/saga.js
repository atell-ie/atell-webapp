import { all, call, put, takeLatest } from "redux-saga/effects";
import { actionCreators, actionTypes } from "./actions";
import config from "../../config";
import { http } from "../../common/lib";
import fakeData from "./fakeData";

import humps from "humps";

function* getUploads(action) {
    // const { deviceId } = action.payload;
    const url = `${config.api.baseUrl}/${config.api.urls.mediaFiles}`;

    try {
        const { data } = yield call(http.authorized.get, url);

        yield put(actionCreators.getRequestSuccess(data));
    } catch (error) {
        yield put(actionCreators.getRequestFailure(error.toString()));
    }
}

function* postUpload(action) {
    const { uploadData } = action.payload;
    const url = `${config.api.baseUrl}${config.api.urls.mediaFiles}`;

    console.log("uploadData", uploadData);

    const formData = new FormData();

    for (var key in uploadData) {
        const newKey = humps.decamelize(key, { separator: "_" });
        formData.append(newKey, uploadData[key]);
    }

    formData.append("format", "mp3"); // TODO: temp to remove
    formData.append("media_type", "audio"); // TODO: temp to remove

    try {
        const { data } = yield call(http.authorized.postForm, url, formData);
        yield put(actionCreators.postRequestSuccess(data));
    } catch (error) {
        yield put(actionCreators.postRequestFailure(error.toString()));
    }
}

export { getUploads, postUpload };

export default (function* () {
    yield all([takeLatest(actionTypes.UPLOADS_GET_REQUEST, getUploads)]);
    yield all([takeLatest(actionTypes.UPLOAD_POST_REQUEST, postUpload)]);
})();
