import { all, call, put, takeLatest } from "redux-saga/effects";
import { db } from "../../common/lib";
import { actionCreators, actionTypes } from "./actions";
import { get, set } from "idb-keyval";

function* select() {
    try {
        const audits = yield call(get, db.types.audit);
        yield put(actionCreators.selectSuccess(audits));
    } catch (error) {
        yield put(actionCreators.selectFailure(error.toString()));
    }
}

function* create(action) {
    const { newPatient } = action.payload;
    try {
        // const data = yield call(
        //     http.authorized.post,
        //     config.api.paths.newPatient,
        //     newPatient
        // );

        yield put(actionCreators.createSuccess(newPatient));
    } catch (error) {
        yield put(actionCreators.createFailure(error.toString()));
    }
}

function* write(action) {
    const { audits } = action.payload;
    try {
        const res = yield call(set, db.types.audit, audits);
        yield put(actionCreators.writeSuccess(res));
    } catch (error) {
        yield put(actionCreators.writeFailure(error.toString()));
    }
}

export { select, write };

export default (function* () {
    yield all([
        takeLatest(actionTypes.USERS_SELECT_REQUEST, select),
        takeLatest(actionTypes.USERS_CREATE_REQUEST, create),
        takeLatest(actionTypes.USERS_WRITE_REQUEST, write)
    ]);
})();
