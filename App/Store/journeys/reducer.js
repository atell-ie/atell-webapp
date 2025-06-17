import list from "../../common/lib/helpers/list";
import getInitialState from "../get-initial-state";
import { actionTypes } from "./actions";

const initialState = getInitialState.list();


export default function (state = { ...initialState }, action) {
    switch (action.type) {
        case actionTypes.JOURNEYS_ITEM_SET: {
            const { item } = action.payload;
            return { ...state, item: item };
        }
        case actionTypes.JOURNEYS_GET_SUCCESS: {
            const { journeys } = action.payload;
            return list.getReducer(state, journeys);
        }
        case actionTypes.JOURNEYS_POST_SUCCESS: {
            const { newJourneyData } = action.payload;

            const journeys = [...state.data];
            journeys.unshift(newJourneyData);

            return list.getReducer(state, journeys);
        }
        case actionTypes.JOURNEYS_PUT_SUCCESS: {
            const { updatedJourneyData } = action.payload;

            const journeys = [...state.data];
            const index = journeys.findIndex(journey => journey.id === updatedJourneyData.id);
            if (index !== -1) {
                journeys[index] = updatedJourneyData;
            }

            return list.getReducer(state, journeys);
        }
        default: {
            return state;
        }
    }
}
