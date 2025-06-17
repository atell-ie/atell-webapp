import list from "../../common/lib/helpers/list";
import getInitialState from "../get-initial-state";
import { actionTypes } from "./actions";

const initialState = getInitialState.list();

export default function (state = { ...initialState }, action) {
    switch (action.type) {
        case actionTypes.GET_WORD_IPAS_SUCCESS: {
            const { ipasData } = action.payload;

            return list.getReducer(state, ipasData);
        }

        default: {
            return state;
        }
    }
}
