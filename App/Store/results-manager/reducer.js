import { actionTypes } from "./actions";

const initialState = {
    targetWordInstances: {},
    selectedTargetWordId: null,
    selectedResult: null,
    analysisLoading: true,
    selectedWordIndex: 0
};

export default function (state = { ...initialState }, action) {
    switch (action.type) {
        case actionTypes.UPDATE: {
            const { data } = action.payload;
            return { ...state, ...data };
        }

        case actionTypes.UPDATE_INDEX: {
            const { index } = action.payload;

            const targetsData = state.targetWordInstances;

            let newIndex = index;
            if (index < 0) newIndex = 0;
            else if (index > Object.keys(targetsData).length - 1)
                newIndex = Object.keys(targetsData).length - 1;

            let updatedState = { ...state, selectedWordIndex: newIndex };

            return updatedState;
        }

        default: {
            return state;
        }
    }
}
