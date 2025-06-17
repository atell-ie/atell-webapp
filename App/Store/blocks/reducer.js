import list from "../../common/lib/helpers/list";
import getInitialState from "../get-initial-state";
import { actionTypes } from "./actions";

const initialState = getInitialState.list();

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.BLOCK_ITEM_CLEAR: {
            return { ...state, item: null };
        }
        case actionTypes.BLOCK_ITEM_SET: {
            const { block } = action.payload;
            return { ...state, item: { ...state.item, ...block } };
        }
        case actionTypes.BLOCK_ITEM_UPDATE: {
            const { block } = action.payload;
            return { ...state, item: { ...state.item, ...block } };
        }
        case actionTypes.BLOCKS_REQUEST_SUCCESS: {
            const { blocks } = action.payload;
            return list.getReducer(state, blocks);
        }

        case actionTypes.BLOCK_REQUEST_SUCCESS: {
            const { block, blockId } = action.payload;
            // assign selected task
            const selectedTask = state.data.find(
                (item) => item.id === parseInt(blockId)
            );
            return {
                ...state,
                item: { ...state.item, ...block, selectedBlock }
            };
        }
        default: {
            return state;
        }
    }
}
