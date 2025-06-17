import list from "../../common/lib/helpers/list";
import getInitialState from "../get-initial-state";
import { actionTypes } from "./actions";

const initialState = getInitialState.list();

// const reducer = (aggregate: any, [key, value]: any) => ({
//     ...aggregate,
//     [key]: list.getReducer({}, value)
// });

export default function (state = { ...initialState }, action) {
    switch (action.type) {
        case actionTypes.UPLOAD_ITEM_SET: {
            const { item } = action.payload;
            return { ...state, item: item };
        }
        case actionTypes.UPLOADS_GET_SUCCESS: {
            const { uploads } = action.payload;
            return list.getReducer(state, uploads);
        }
        case actionTypes.UPLOAD_POST_SUCCESS: {
            const { newUploadData } = action.payload;

            const uploads = [...state.data];
            uploads.unshift(newUploadData);

            return list.getReducer(state, uploads);
        }

        default: {
            return state;
        }
    }
}
