import getInitialState from "../get-initial-state";
import { actionTypes } from "./actions";

const initialState = getInitialState.list();

const idKey = (item) => `${item.resultTarget}-${item.wordIpa}`;

const getReducerByWordIpa = (state: any, data: Array<any>) => ({
    ...state,
    byId: data.reduce(
        (p: any, c: any, i: number) => ({ ...p, [idKey(c)]: i }),
        {}
    ),
    data
});

export default function (state = { ...initialState }, action) {
    switch (action.type) {
        case actionTypes.WORDS_ERRORS_GET_SUCCESS: {
            const { resultIpas } = action.payload;

            return getReducerByWordIpa(state, resultIpas);
        }
        case actionTypes.ANALYSIS_RESULT_WORD_IPA_BULK_UPSERT_SUCCESS: {
            const { resultIpas } = action.payload;

            const updatedData = [...state.data];

            resultIpas.forEach((resultIpa) => {
                const key = `${resultIpa.resultTarget}-${resultIpa.wordIpa}`;
                const existingIndex = state.byId[key];

                if (existingIndex !== undefined) {
                    // Update existing entry
                    updatedData[existingIndex] = resultIpa;
                } else {
                    // Add new entry
                    updatedData.push(resultIpa);
                }
            });

            return getReducerByWordIpa(state, updatedData);
        }

        default: {
            return state;
        }
    }
}
