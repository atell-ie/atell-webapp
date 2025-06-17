import {
    all,
    call,
    cancel,
    delay,
    fork,
    put,
    take,
    takeLatest
} from "redux-saga/effects";
// import { actionCreators as toastActions } from "../old__toast/actions";
import config from "../../config";
import i18next from "../../common/i18n";
import { actionCreators, actionTypes } from "./actions";

const getCurrentPosition = (options) =>
    new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });

function* geoLocationGet() {
    try {
        const { coords } = yield call(
            getCurrentPosition,
            config.geoLocation.options
        );
        /** Construct new obj for idb cloning issue  */
        const geoInformation = {
            altitude: coords.altitude,
            altitudeAccuracy: coords.altitudeAccuracy,
            heading: coords.heading,
            latitude: coords.latitude,
            longitude: coords.longitude,
            speed: coords.speed
        };

        yield put(actionCreators.getSuccess(geoInformation));
    } catch (error) {
        yield all([
            put(actionCreators.getFailure(error.toString()))
            // put(toastActions.error(i18next.t("errors.geoLocationGet"))),
        ]);
    }
}

function* geoLocationWatchTaskTick() {
    while (true) {
        yield delay(config.geoLocation.interval);
        yield put(actionCreators.getRequest());
    }
}

function* geoLocationWatch() {
    while (yield take(actionTypes.GEO_LOCATION_WATCH_START)) {
        const workerTask = yield fork(geoLocationWatchTaskTick);
        yield take(actionTypes.GEO_LOCATION_WATCH_STOP);
        yield cancel(workerTask);
    }
}
export { geoLocationGet };

export default (function* () {
    yield all([
        takeLatest(actionTypes.GEO_LOCATION_GET_REQUEST, geoLocationGet),
        geoLocationWatch()
    ]);
})();
