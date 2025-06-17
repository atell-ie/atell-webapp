import {
    all,
    call,
    cancel,
    delay,
    fork,
    put,
    select,
    take,
    takeLatest
} from "redux-saga/effects";
import { get, update } from "idb-keyval";
import { db, http } from "../../common/lib";
import actions from "../actions";
import config from "../../config";
import { actionCreators, actionTypes } from "./actions";

function* post() {
    try {
        const { app, auditLocations, audits } = yield select((state) => state);

        if (app.backgroundSyncEnabled) {
            const auditLocationIds = auditLocations.data
                .filter((item) => item.audit.id === audits.item.id)
                .map((item) => item.id);

            let auditAssetsDB = (yield call(get, db.types.auditAsset)) || [];
            /** Filter auditAssets  based on  Mandatory and Expected */
            /** Removing  && item.isAssigned  for non mandatory assets */

            auditAssetsDB = auditAssetsDB.filter(
                (item) => item.auditLocation.audit.id === audits.item.id
            );

            const auditAssets = db.queries.forAuditLocationIds(
                auditLocationIds,
                auditAssetsDB
            );
            /** To post appAssigned  */
            const appAssigned = auditAssets
                .filter((item) => item.isAssigned === true)
                .map((item) => item.id);
            yield put(
                actions.app.create.update({ backgroundSyncRequest: true })
            );

            const { data } = yield call(
                http.authorized.post,
                config.api.urls.assetSync,
                {
                    auditAssets: appAssigned,
                    auditLocations: auditLocationIds
                }
            );

            // if there was no assets to sync with, we don't need to update our redux and db
            if (data.length === 0) {
                yield put(
                    actions.app.create.update({ backgroundSyncRequest: false })
                );
                return;
            }

            /** Received data after the post and filter the data isAssigned */

            const serverAssigned = data
                .filter((item) => item.isAssigned === true)
                .map((item) => ({ id: item.id, isAssigned: item.isAssigned }));

            const assetIds = serverAssigned.map((item) => item.id);

            /** Update store */

            const updatedAssets = auditAssets.map((item) => {
                if (assetIds.includes(item.id)) {
                    item.isAssigned = true;
                }
                return item;
            });

            /** update db */
            yield call(
                update,
                db.types.auditAsset,
                (updatedAuditAssetDB = []) => {
                    return updatedAuditAssetDB.map((item) => {
                        if (assetIds.includes(item.id)) {
                            item.isAssigned = true;
                        }
                        return item;
                    });
                }
            );

            yield all([
                put(
                    actions.app.create.update({ backgroundSyncRequest: false })
                ),
                put(actions.auditAssets.create.writeRequest(updatedAssets)),
                put(actionCreators.postSuccess(data))
            ]);
        }
    } catch (error) {
        yield all([
            put(actions.app.create.update({ backgroundSyncRequest: false })),
            put(actionCreators.postFailure(error))
        ]);
    }
}

function* watchTaskTick() {
    while (true) {
        yield delay(config.assetSync.timeout);
        const { app } = yield select((state) => state);
        // use asset-sync only if app is online
        if (app.netConnected) yield put(actionCreators.postRequest());
    }
}

function* watch() {
    // On Assets list loading initiate syncing request
    // TODO: requires proper mocking of indexDB
    //yield put(actionCreators.postRequest());

    //Sync assets on delay basis
    while (yield take(actionTypes.ASSET_SYNC_START)) {
        const workerTask = yield fork(watchTaskTick);
        yield take(actionTypes.ASSET_SYNC_STOP);
        yield cancel(workerTask);
    }
}
// For testing
export { post };
export default (function* () {
    yield all([takeLatest(actionTypes.ASSET_SYNC_POST_REQUEST, post), watch()]);
})();
