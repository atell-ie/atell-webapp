import { all, call, put, takeLatest } from "redux-saga/effects";
import { actionCreators, actionTypes } from "./actions";
import config from "../../config";
import { http } from "../../common/lib";


function* getClients(action) {
    const url = `${config.api.baseUrl}/${config.api.urls.clients}`;

    try {
        const { data } = yield call(http.authorized.get, url);

        yield put(actionCreators.getClientsSuccess(data));
    } catch (error) {
        yield put(actionCreators.getClientsFailure(error.toString()));
    }
}

function* postClient(action) {
    const { clientData } = action.payload;
    const url = `${config.api.baseUrl}/${config.api.urls.clients}`;

    try {
        const { data } = yield call(http.authorized.post, url, clientData);
        yield put(actionCreators.postClientsSuccess(data));
    } catch (error) {
        yield put(actionCreators.postClientsFailure(error.toString()));
    }
}

function* putClient(action) {
    const { clientData } = action.payload;
    const url = `${config.api.baseUrl}/${config.api.urls.clients}`;

    try {
        const { data } = yield call(http.authorized.put, url, clientData);
        yield put(actionCreators.putClientsSuccess(data));
    } catch (error) {
        yield put(actionCreators.putClientsFailure(error.toString()));
    }
}


export default (function* () {
    yield all([takeLatest(actionTypes.CLIENTS_GET, getClients)]);
    yield all([takeLatest(actionTypes.CLIENTS_POST, postClient)]);
    yield all([takeLatest(actionTypes.CLIENTS_PUT, putClient)]);
})();
