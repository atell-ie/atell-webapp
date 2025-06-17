import { all, put, takeLatest } from "redux-saga/effects";
import { actionCreators, actionTypes } from "./actions";
import { http } from "../../common/lib";
import config from "../../config";

const assignmentsData = [
    {
        id: 1,
        name: "Aoife Hendricks",
        age: "5 years old",
        assignmentType: 1,
        impairmentType: 1,
        assignmentSourceId: 1,
        price: "50"
    }
];

const assignmentData = {
    main: [
        {
            data: "",
            element: "title"
        },
        {
            data: "",
            element: "paragraph"
        },
        {
            data: [""],
            element: "list"
        }
    ]
};

function* getRequest(action) {
    // const {  } = action.payload;
    try {
        //const { data } = yield call(http.authorized.get, config.api.paths.tasks);

        yield put(actionCreators.getRequestSuccess(assignmentsData));
    } catch (error) {
        yield put(actionCreators.getRequestFailure(error.toString()));
    }
}

function* getAssignmentRequest(action) {
    const { assignmentId } = action.payload;
    try {
        //const { data } = yield call(http.authorized.get, config.api.paths.tasks);

        yield put(actionCreators.getAssignmentSuccess(assignmentData));
    } catch (error) {
        yield put(actionCreators.getAssignmentFailure(error.toString()));
    }
}

function* postAssignmentRequest(action) {
    const { assigmentData } = action.payload;
    try {
        //const { data } = yield call(http.authorized.get, config.api.paths.tasks);
        const data = {
            id: 99,
            name: "Patient name",
            age: "3 years old",
            assignmentType: assigmentData.assignmentType,
            impairmentType: assigmentData.impairmentType,
            assignmentSource: assigmentData.assignmentSource,
            paymentFees: 0,
            paymentMethod: 0
        };

        yield put(actionCreators.postAssignmentSuccess(data));
    } catch (error) {
        yield put(actionCreators.postAssignmentFailure(error.toString()));
    }
}

function* putAssignmentRequest(action) {
    const { assigmentData } = action.payload;
    try {
        //const { data } = yield call(http.authorized.get, config.api.paths.tasks);
        const data = {
            id: 99,
            name: "Patient name",
            age: "3 years old",
            assignmentType: assigmentData.assignmentType,
            impairmentType: assigmentData.impairmentType,
            assignmentSource: assigmentData.assignmentSourceId,
            price: ""
        };

        yield put(actionCreators.putAssignmentSuccess());
    } catch (error) {
        yield put(actionCreators.putAssignmentFailure(error.toString()));
    }
}

export { getRequest, getAssignmentRequest, postAssignmentRequest };

export default (function* () {
    yield all([
        takeLatest(actionTypes.ASSIGNMENTS_REQUEST, getRequest),
        takeLatest(actionTypes.ASSIGNMENT_REQUEST, getAssignmentRequest),
        takeLatest(actionTypes.POST_ASSIGNMENT_REQUEST, postAssignmentRequest),
        takeLatest(actionTypes.PUT_ASSIGNMENT_REQUEST, putAssignmentRequest)
    ]);
})();
