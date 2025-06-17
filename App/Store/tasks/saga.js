import { all, put, takeLatest } from "redux-saga/effects";
import { actionCreators, actionTypes } from "./actions";
import { http } from "../../common/lib";
import config from "../../config";

import treatmentBlock from "./TestData/treatment_block";

function* getRequest(action) {
    const { blockId } = action.payload;
    try {
        //const { data } = yield call(http.authorized.get, `${config.api.paths.tasks}/${blockId}`);
        yield put(actionCreators.getRequestSuccess(treatmentBlock));
    } catch (error) {
        yield put(actionCreators.getRequestFailure(error.toString()));
    }
}

// import taskData from "./TestData/taskDataAssesment";
// import taskData from "../targets/targetsData";

function* getTaskRequest(action) {
    const { exerciseId } = action.payload;
    try {
        //const { data } = yield call(http.authorized.get, config.api.paths.tasks);

        // console.log("taskData", taskData);
        // const exercise = taskData.filter(
        //     (item) => item.id === parseInt(exerciseId)
        // );

        yield put(actionCreators.getTaskRequestSuccess({}, exerciseId));
    } catch (error) {
        yield put(actionCreators.getTaskRequestFailure(error.toString()));
    }
}

export { getRequest, getTaskRequest };

export default (function* () {
    yield all([
        takeLatest(actionTypes.TASKS_REQUEST, getRequest),
        takeLatest(actionTypes.TASK_REQUEST, getTaskRequest)
    ]);
})();
