import list from "../../common/lib/helpers/list";
import getInitialState from "../get-initial-state";
import { actionTypes } from "./actions";

const initialState = getInitialState.list();


export default function (state = { ...initialState }, action) {
    switch (action.type) {
        case actionTypes.SESSIONS_ITEM_SET: {
            const { item } = action.payload;
            return { ...state, item: item };
        }
        case actionTypes.SESSIONS_GET_SUCCESS: {
            const { sessions } = action.payload;
            return list.getReducer(state, sessions);
        }
        case actionTypes.SESSIONS_POST_SUCCESS: {
            const { newSessionData } = action.payload;

            const sessions = [...state.data];
            sessions.unshift(newSessionData);

            return list.getReducer(state, sessions);
        }
        case actionTypes.SESSIONS_PUT_SUCCESS: {
            const { updatedSessionData } = action.payload;

            const sessions = [...state.data];
            const index = sessions.findIndex(session => session.id === updatedSessionData.id);
            if (index !== -1) {
                sessions[index] = updatedSessionData;
            }

            return list.getReducer(state, journeys);
        }
        default: {
            return state;
        }
    }
}
