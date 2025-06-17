import { ERROR_ACTION, WAIT_FOR_ACTION } from "redux-wait-for-action";

export const actionTypes = {
    BOOKING_ITEM_CLEAR: "BOOKING_ITEM_CLEAR",
    BOOKING_ITEM_SET: "BOOKING_ITEM_SET",
    BOOKING_ITEM_UPDATE: "BOOKING_ITEM_UPDATE",

    BOOKINGS_REQUEST: "BOOKINGS_REQUEST",
    BOOKINGS_REQUEST_SUCCESS: "BOOKINGS_REQUEST_SUCCESS",
    BOOKINGS_REQUEST_FAILURE: "BOOKINGS_REQUEST_FAILURE",

    BOOKING_REQUEST: "BOOKING_REQUEST",
    BOOKING_REQUEST_SUCCESS: "BOOKING_REQUEST_SUCCESS",
    BOOKING_REQUEST_FAILURE: "BOOKING_REQUEST_FAILURE",

    POST_BOOKING_REQUEST: "POST_BOOKING_REQUEST",
    POST_BOOKING_SUCCESS: "POST_BOOKING_SUCCESS",
    POST_BOOKING_FAILURE: "POST_BOOKING_FAILURE",

    PUT_BOOKING_REQUEST: "PUT_BOOKING_REQUEST",
    PUT_BOOKING_SUCCESS: "PUT_BOOKING_SUCCESS",
    PUT_BOOKING_FAILURE: "PUT_BOOKING_FAILURE"
};

export const actionCreators = {
    itemClear: () => ({
        type: actionTypes.BOOKING_ITEM_CLEAR,
        saveReduxState: true
    }),
    itemSet: (item: any) => ({
        type: actionTypes.BOOKING_ITEM_SET,
        payload: { item },
        saveReduxState: true
    }),
    itemUpdate: (section: String, data: any) => ({
        type: actionTypes.BOOKING_ITEM_UPDATE,
        payload: { section, data },
        saveReduxState: true
    }),

    getRequest: () => ({
        type: actionTypes.BOOKINGS_REQUEST,
        payload: {},
        [WAIT_FOR_ACTION]: actionTypes.BOOKINGS_REQUEST_SUCCESS,
        [ERROR_ACTION]: actionTypes.BOOKINGS_REQUEST_FAILURE
    }),
    getRequestSuccess: (bookings: Array<any>) => ({
        type: actionTypes.BOOKINGS_REQUEST_SUCCESS,
        payload: { bookings },
        saveReduxState: true
    }),
    getRequestFailure: (error) => ({
        type: actionTypes.BOOKINGS_REQUEST_FAILURE,
        error
    }),

    getBookingRequest: (bookingId) => ({
        type: actionTypes.BOOKING_REQUEST,
        payload: { bookingId },
        [WAIT_FOR_ACTION]: actionTypes.BOOKING_REQUEST_SUCCESS,
        [ERROR_ACTION]: actionTypes.BOOKING_REQUEST_FAILURE
    }),
    getBookingSuccess: (booking: any) => ({
        type: actionTypes.BOOKING_REQUEST_SUCCESS,
        payload: { booking },
        saveReduxState: true
    }),
    getBookingFailure: (error) => ({
        type: actionTypes.BOOKING_REQUEST_FAILURE,
        error
    }),

    postAssignmentRequest: (bookingData) => ({
        type: actionTypes.POST_BOOKING_REQUEST,
        payload: { bookingData },
        [WAIT_FOR_ACTION]: actionTypes.POST_BOOKING_SUCCESS,
        [ERROR_ACTION]: actionTypes.POST_BOOKING_FAILURE
    }),
    postAssignmentSuccess: (booking: any) => ({
        type: actionTypes.POST_BOOKING_SUCCESS,
        payload: { booking },
        saveReduxState: true
    }),
    postAssignmentFailure: (error) => ({
        type: actionTypes.POST_BOOKING_FAILURE,
        error
    }),

    putBookingRequest: (bookingData) => ({
        type: actionTypes.PUT_BOOKING_REQUEST,
        payload: { bookingData },
        [WAIT_FOR_ACTION]: actionTypes.PUT_BOOKING_SUCCESS,
        [ERROR_ACTION]: actionTypes.PUT_BOOKING_FAILURE
    }),
    putBookingSuccess: (booking: any) => ({
        type: actionTypes.PUT_BOOKING_SUCCESS,
        payload: { booking },
        saveReduxState: true
    }),
    putBookingFailure: (error) => ({
        type: actionTypes.PUT_BOOKING_FAILURE,
        error
    })
};

export default {
    create: actionCreators,
    type: actionTypes
};
