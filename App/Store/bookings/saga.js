import { all, put, takeLatest } from "redux-saga/effects";
import { actionCreators, actionTypes } from "./actions";
import { http } from "../../common/lib";
import config from "../../config";

const bookings = [
    {
        id: 1,
        date: "2022-06-01",
        appointments: [
            { time: "10:00 AM", name: "Alex" },
            { time: "11:00 AM", name: "Jane" },
            { time: "1:00 PM", name: "Bill" },
            { time: "2:00 PM", name: "Brown" }
        ]
    },
    {
        id: 2,
        date: "2022-06-02",
        appointments: [
            { time: "10:00 AM", name: "John" },
            { time: "1:00 PM", name: "Smith" }
        ]
    },
    {
        id: 3,
        date: "2022-06-03",
        appointments: [
            { time: "09:00 AM", name: "Nick" },
            { time: "2:00 PM", name: "Jonathn" }
        ]
    },
    {
        id: 4,
        date: "2022-06-04",
        appointments: [
            { time: "10:00 AM", name: "Mike" },
            { time: "11:00 AM", name: "Hazel" },
            { time: "3:00 PM", name: "Tom" },
            { time: "4:00 PM", name: "Arnold" },
            { time: "5:00 PM", name: "Bob" }
        ]
    },
    {
        id: 5,
        date: "2022-06-05",
        appointments: [{ time: "10:00 AM", name: "John" }]
    },
    {
        id: 6,
        date: "2022-06-06",
        appointments: [
            { time: "10:00 AM", name: "John" },
            { time: "11:00 AM", name: "Jane" },
            { time: "1:00 PM", name: "Smith" },
            { time: "2:00 PM", name: "Brown" }
        ]
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

        yield put(actionCreators.getRequestSuccess(bookings));
    } catch (error) {
        yield put(actionCreators.getRequestFailure(error.toString()));
    }
}

function* getBookingRequest(action) {
    const { bookingId } = action.payload;
    try {
        //const { data } = yield call(http.authorized.get, config.api.paths.tasks);

        yield put(actionCreators.getBookingSuccess(bookingData));
    } catch (error) {
        yield put(actionCreators.getBookingFailure(error.toString()));
    }
}

function* postBookingRequest(action) {
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

        yield put(actionCreators.postBookingSuccess(data));
    } catch (error) {
        yield put(actionCreators.postBookingFailure(error.toString()));
    }
}

function* putBookingRequest(action) {
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

        yield put(actionCreators.putBookingSuccess());
    } catch (error) {
        yield put(actionCreators.putBookingFailure(error.toString()));
    }
}

export { getRequest, getBookingRequest, postBookingRequest };

export default (function* () {
    yield all([
        takeLatest(actionTypes.BOOKINGS_REQUEST, getRequest),
        takeLatest(actionTypes.BOOKING_REQUEST, getBookingRequest),
        takeLatest(actionTypes.POST_BOOKING_REQUEST, postBookingRequest),
        takeLatest(actionTypes.PUT_BOOKING_REQUEST, putBookingRequest)
    ]);
})();
