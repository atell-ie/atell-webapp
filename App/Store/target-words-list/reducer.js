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
        case actionTypes.TARGET_LIST_ITEM_CLEAR: {
            return { ...state, item: { ...defaultItem } };
        }
        case actionTypes.TARGET_LIST_ITEM_SET: {
            const { newItem } = action.payload;
            const updItem = { ...state.item, ...newItem };
            return { ...state, item: updItem };
        }
        case actionTypes.TARGET_LISTS_GET_SUCCESS: {
            const { wordsList } = action.payload;

            return list.getReducer(state, wordsList);
        }
        case actionTypes.TARGET_LIST_POST_SUCCESS: {
            const { newWordsList } = action.payload;

            const wordsList = [...state.data];
            wordsList.push(newWordsList);

            return list.getReducer(state, wordsList);
        }

        case actionTypes.TARGET_LIST_PUT_SUCCESS: {
            const { wordListId, updWordsList } = action.payload;

            const index = state.byId[wordListId];
            const updData = [...state.data];
            updData[index].words = updWordsList.words;
            updData[index].name = updWordsList.name;
            updData[index].description = updWordsList.description;

            return list.getReducer(state, updData);
        }

        case actionTypes.TARGET_LIST_DELETE_SUCCESS: {
            const { wordListId } = action.payload;
            const updData = state.data.filter(item => item.id !== wordListId);
            return list.getReducer(state, updData);
        }

        default: {
            return state;
        }
    }
}
