import { all, call, put, takeLatest } from "redux-saga/effects";
import { helpers, http } from "../../common/lib";
import config from "../../config";
import { actionCreators, actionTypes } from "./actions";

import typesList from "./typesList";

const reducer = (aggregate: any, [key, value]: any) => ({
    ...aggregate,
    [key]: helpers.list.getReducer({}, value)
});

function* getRequest(action) {
    const {} = action.payload;
    try {
        const url = `${config.api.baseUrl}${config.api.urls.typesList}`;

        const typesList = yield call(http.authorized.get, url);
        console.log("------typesList", typesList);
        // yield call(set, db.types.typesList, typeListDB);
        const data = Object.entries(typesList.data).reduce(reducer, {});
        yield put(actionCreators.getSuccess(data));
    } catch (error) {
        yield put(actionCreators.getFailure(error));
    }
}

export { getRequest };

export default (function* () {
    yield all([takeLatest(actionTypes.TYPES_LIST_GET_REQUEST, getRequest)]);
})();
