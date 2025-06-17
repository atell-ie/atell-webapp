import config from "../../config";
import { actionTypes } from "./actions";

const initialState = {
    drawerOpen: true,
    paginationRowsPerPage: config.pagination.rowsPerPageOptions[0],
};

export default function (state = { ...initialState }, action) {
    switch (action.type) {
        case actionTypes.APP_SETTINGS_SET: {
            const { appSetting } = action.payload;
            return { ...state, ...appSetting };
        }
        default: {
            return state;
        }
    }
}
