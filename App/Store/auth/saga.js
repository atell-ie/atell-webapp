import { all, call, put, takeLatest } from "redux-saga/effects";
import jwtDecode from "jwt-decode";
import { encode } from "base-64";
import moment from "moment";
import { http } from "../../common/lib";
import newHttp from "../../common/lib/newHttp";
import config from "../../config";
import { actionCreators, actionTypes } from "./actions";
import tempLogin from "./tempLogin";

function* get(action) {
    const { password, username } = action.payload;
    const authUrl = `${config.auth.url}`;
    try {
        // const creds = {
        //     email: username,
        //     password: password
        // };

        const creds = {
            Authorization: `Basic ${encode(`${username}:${password}`)}`
        };

        const auth = yield call(http.anonymous.post, authUrl, creds);

        //const { exp, sub } = jwtDecode(auth.data.idToken);
        const exp = 2667437250;
        const sub = 1667410250;

        // const accountUrl = `${config.api.baseUrl}${config.api.urls.me}?identity_id=${sub}`;
        // const acountDetails = yield call(http.anonymous.get, accountUrl, {
        //     Authorization: `JWT ${auth.data.idToken}`
        // });

        const account = tempLogin.data.account;

        yield put(
            actionCreators.getSuccess({
                ...tempLogin.data,
                tempToken: auth.data.token, // TODO: temp
                account: account.data[0],
                expiryDate: moment.unix(exp).utc(),
                identityId: sub,
                username
            })
        );

        const authString = JSON.stringify({
            ...tempLogin.data,
            tempToken: auth.data.token, // TODO: temp
            account: account.data[0],
            expiryDate: moment.unix(exp).utc(),
            identityId: sub,
            username
        });
        // update storage with recent Authentication
        localStorage.setItem("persist:root", authString);
    } catch (error) {
        yield put(actionCreators.getFailure(error.toString()));
    }
}

function* logout() {
    try {
        localStorage.setItem("persist:root", "{}");
    } catch (error) {
        console.log(error);
        yield put(actionCreators.getFailure(error.toString()));
    }
}

export { get, logout };

export default (function* () {
    yield all([
        takeLatest(actionTypes.AUTH_GET_REQUEST, get),
        takeLatest(actionTypes.AUTH_LOGOUT, logout)
    ]);
})();
