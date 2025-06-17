import list from "../../common/lib/helpers/list";
import getInitialState from "../get-initial-state";
import { actionTypes } from "./actions";

const initialState = getInitialState.list();

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.TARGET_ITEM_CLEAR: {
            return { ...state, item: null };
        }
        case actionTypes.TARGET_ITEM_SET: {
            const { target } = action.payload;
            return { ...state, item: target };
        }
        case actionTypes.TARGET_ITEM_UPDATE: {
            const { section, data } = action.payload;
            const { item } = state;
            const newItem = { ...item };
            newItem[section] = data;
            return { ...state, item: newItem };
        }
        case actionTypes.TARGETS_REQUEST_SUCCESS: {
            const { targets } = action.payload;
            return list.getReducer(state, targets);
        }

        case actionTypes.TARGET_REQUEST_SUCCESS: {
            const { target } = action.payload;
            return { ...state, item: target };
        }
        default: {
            return state;
        }
    }
}
