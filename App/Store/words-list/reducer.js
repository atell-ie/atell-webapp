import list from "../../common/lib/helpers/list";
import getInitialState from "../get-initial-state";
import { actionTypes } from "./actions";

const defaultItem = {
    name: "",
    description: "",
    words: []
};

const initialState = getInitialState.list();
initialState.item = defaultItem;

export default function (state = { ...initialState }, action) {
    switch (action.type) {
        case actionTypes.WORDS_GET_SUCCESS: {
            const data = action.payload;

            return list.getReducer(state, data);
        }

        default: {
            return state;
        }
    }
}
