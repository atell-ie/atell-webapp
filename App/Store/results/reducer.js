import list from "../../common/lib/helpers/list";
import getInitialState from "../get-initial-state";
import { actionTypes } from "./actions";

const initialState = getInitialState.list();

export default function (state = { ...initialState }, action) {
    switch (action.type) {
        case actionTypes.INIT_MAPPING: {
            const { data } = action.payload;

            return list.getReducer(state, data);
        }
        case actionTypes.UPDATE_DATA: {
            const { data } = action.payload;

            return {...state, data}
        }

        case actionTypes.GET_RESULTS_SUCCESS: {
            const { resultsData } = action.payload;

            return list.getReducer(state, resultsData);
        }

        default: {
            return state;
        }
    }
}
