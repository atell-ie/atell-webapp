import { actionTypes } from "./actions";
import moment from "moment";

const initialState = {
    account: {},
    accessToken: "",
    expiryDate: moment(0).toISOString(),
    idToken: "",
    refreshToken: "",
    tokenType: "",
    displayName: "",
    username: "",
    regStatus: ""
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.AUTH_GET_REQUEST: {
            return { ...initialState };
        }
        case actionTypes.AUTH_GET_SUCCESS: {
            return { ...action.payload };
        }
        case actionTypes.AUTH_LOAD_SESSION: {
            return { ...action.payload };
        }
        case actionTypes.AUTH_LOGOUT: {
            const { username } = state;
            return { ...initialState, username };
        }
        default: {
            return state;
        }
    }
}
