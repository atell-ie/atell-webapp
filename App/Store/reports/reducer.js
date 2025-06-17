import list from "../../common/lib/helpers/list";
import getInitialState from "../get-initial-state";
import { actionTypes } from "./actions";

const initialState = getInitialState.list();

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.REPORT_ITEM_CLEAR: {
            return { ...state, item: null };
        }
        case actionTypes.REPORT_ITEM_SET: {
            const { report } = action.payload;
            return { ...state, item: report };
        }
        case actionTypes.REPORT_ITEM_UPDATE: {
            const { section, data } = action.payload;
            const { item } = state;
            const newItem = { ...item };
            newItem[section] = data;
            return { ...state, item: newItem };
        }
        case actionTypes.REPORTS_REQUEST_SUCCESS: {
            const { reports } = action.payload;
            return list.getReducer(state, reports);
        }

        case actionTypes.REPORT_REQUEST_SUCCESS: {
            const { report } = action.payload;
            return { ...state, item: report };
        }

        case actionTypes.POST_REPORT_SUCCESS: {
            const { report } = action.payload;

            const reports = [...state.data];
            reports.push({
                id: report.id,
                name: report.clientId
            });

            return list.getReducer(state, reports);
        }

        case actionTypes.PUT_REPORT_SUCCESS: {
            const { report } = action.payload;
            return { ...state, item: report };
        }
        default: {
            return state;
        }
    }
}
