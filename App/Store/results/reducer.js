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

            return { ...state, data };
        }
        case actionTypes.PATCH_RESULT_TARGET_SUCCESS: {
            const { patchedData } = action.payload;

            // Find the index of the record to update
            const recordIndex = state.data.findIndex(
                (item) => item.id === patchedData.id
            );

            if (recordIndex === -1) {
                // Record not found, return state unchanged
                return state;
            }

            // Create new data array with updated record
            const updatedData = [...state.data];
            updatedData[recordIndex] = {
                ...updatedData[recordIndex],
                ...patchedData,
                // Convert snake_case API response to camelCase for consistency
                foundWord: patchedData.found_word || patchedData.foundWord,
                startTime: patchedData.start_time || patchedData.startTime,
                endTime: patchedData.end_time || patchedData.endTime,
                targetWord: patchedData.target_word || patchedData.targetWord,
                analysisResult:
                    patchedData.analysis_result || patchedData.analysisResult
            };

            // Update byId mapping if it exists
            const updatedById = { ...state.byId };
            if (updatedById[patchedData.id] !== undefined) {
                updatedById[patchedData.id] = recordIndex;
            }

            return {
                ...state,
                data: updatedData,
                byId: updatedById
            };
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
