import list from "../../common/lib/helpers/list";
import getInitialState from "../get-initial-state";
import { actionTypes } from "./actions";

const initialState = getInitialState.list();

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.TASK_ITEM_CLEAR: {
            return { ...state, item: null };
        }
        case actionTypes.TASK_ITEM_SET: {
            const { task } = action.payload;
            return { ...state, item: { ...state.item, ...task } };
        }
        case actionTypes.TASK_ITEM_UPDATE: {
            const { task } = action.payload;
            return { ...state, item: { ...state.item, ...task } };
        }
        case actionTypes.TASK_ITEM_UPDATE_ENTRY: {
            const { index, mapped } = action.payload;

            const newItem = state.item;
            newItem.block[index].mapped = mapped;

            return { ...state, item: newItem };
        }
        case actionTypes.TASKS_REQUEST_SUCCESS: {
            const { tasks } = action.payload;
            return list.getReducer(state, tasks);
        }

        case actionTypes.TASK_REQUEST_SUCCESS: {
            const { exercise, exerciseId } = action.payload;
            // assign selected task
            // const selectedTask = state.data.find(
            //     (item) => item.id === parseInt(exerciseId)
            // );

            return { ...state, item: { ...exercise } };
        }
        default: {
            return state;
        }
    }
}
