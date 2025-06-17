import getInitialState from "../get-initial-state";
import { actionTypes } from "./actions";

export const typesListInitialState = {
    paymentMethods: getInitialState.list(),
    assignmentTypes: getInitialState.list(),
    impairmentType: getInitialState.list(),
    assessmentType: getInitialState.list(),
    treatmentType: getInitialState.list()
};

export default function (state = typesListInitialState, action) {
    switch (action.type) {
        case actionTypes.TYPES_LIST_GET_SUCCESS: {
            const { typesList } = action.payload;
            return typesList;
        }
        // case actionTypes.TYPES_LIST_SELECT_SUCCESS: {
        //     const { typesList } = action.payload;
        //     return typesList;
        // }
        default: {
            return state;
        }
    }
}
