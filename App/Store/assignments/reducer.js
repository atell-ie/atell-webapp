import list from "../../common/lib/helpers/list";
import getInitialState from "../get-initial-state";
import { actionTypes } from "./actions";

const initialState = getInitialState.list();

const initialItem = {
    id: 0,
    name: "",
    age: "",
    paymentFees: 0,
    paymentMethod: 0,
    assignmentType: 0,
    impairmentType: 0,
    assignmentSource: 0,
    sourceDetails: {
        exercisesInUse: "25",
        dailyLimit: 0,
        phonemes: []
    }
};

export default function (
    state = { ...initialState, item: initialItem },
    action
) {
    switch (action.type) {
        case actionTypes.ASSIGNMENT_ITEM_CLEAR: {
            return { ...state, item: initialItem };
        }
        case actionTypes.ASSIGNMENT_ITEM_SET: {
            const { item } = action.payload;
            return { ...state, item: { ...state.item, ...item } };
        }
        case actionTypes.ASSIGNMENT_ITEM_UPDATE: {
            const { section, data } = action.payload;
            const { item } = state;
            const newItem = { ...item };
            newItem[section] = data;
            return { ...state, item: newItem };
        }
        case actionTypes.ASSIGNMENTS_REQUEST_SUCCESS: {
            const { assignments } = action.payload;
            return list.getReducer(state, assignments);
        }

        case actionTypes.ASSIGNMENT_REQUEST_SUCCESS: {
            const { assignment } = action.payload;
            return { ...state, item: assignment };
        }
        case actionTypes.POST_ASSIGNMENT_SUCCESS: {
            const { assignment } = action.payload;

            const newAssignments = [...state.data];
            newAssignments.push(assignment);

            console.log("state.item", state.item);
            const newItem = { ...state.item, ...assignment };
            const freshState = { ...initialState, item: newItem };
            console.log("freshState", freshState);
            return list.getReducer(freshState, newAssignments);
        }
        default: {
            return state;
        }
    }
}
