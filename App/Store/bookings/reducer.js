import getInitialState from "../get-initial-state";
import { actionTypes } from "./actions";

const getReducer = (state: any, data: Array<any>) => ({
    ...state,
    byId: data.reduce(
        (p: any, c: any, i: number) => ({ ...p, [c.date]: i }),
        {}
    ),
    data
});

const initialState = getInitialState.list();

const bookingItem = {
    appointment: 0,
    name: "",
    email: ""
};

export default function (
    state = { ...initialState, item: bookingItem },
    action
) {
    switch (action.type) {
        case actionTypes.BOOKING_ITEM_CLEAR: {
            return { ...state, item: bookingItem };
        }
        case actionTypes.BOOKING_ITEM_SET: {
            const { item } = action.payload;
            return { ...state, item: { ...state.item, ...item } };
        }
        case actionTypes.BOOKING_ITEM_UPDATE: {
            const { section, data } = action.payload;
            const { item } = state;
            const newItem = { ...item };
            newItem[section] = data;
            return { ...state, item: newItem };
        }
        case actionTypes.BOOKINGS_REQUEST_SUCCESS: {
            const { bookings } = action.payload;
            return getReducer(state, bookings);
        }
        case actionTypes.BOOKING_REQUEST_SUCCESS: {
            const { booking } = action.payload;
            return { ...state, item: booking };
        }
        case actionTypes.POST_BOOKING_SUCCESS: {
            const { booking } = action.payload;

            const newBookings = [...state.data];
            newBookings.push(booking);

            const newItem = { ...state.item, ...booking };
            const freshState = { ...initialState, item: newItem };

            return list.getReducer(freshState, newBookings);
        }
        default: {
            return state;
        }
    }
}
