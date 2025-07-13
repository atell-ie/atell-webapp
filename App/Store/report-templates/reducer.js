import list from "../../common/lib/helpers/list";
import getInitialState from "../get-initial-state";
import { actionTypes } from "./actions";

const initialState = getInitialState.list();

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.TEMPLATE_ITEM_CLEAR: {
            return { ...state, item: null };
        }
        case actionTypes.TEMPLATE_ITEM_SET: {
            const { template } = action.payload;
            return { ...state, item: template };
        }
        case actionTypes.TEMPLATE_ITEM_UPDATE: {
            const { section, data } = action.payload;
            const { item } = state;
            const newItem = { ...item };
            newItem[section] = data;
            return { ...state, item: newItem };
        }
        case actionTypes.GET_TEMPLATES_SUCCESS: {
            const { templates } = action.payload;
            console.log("templates", templates);
            return list.getReducer(state, templates);
        }

        case actionTypes.GET_TEMPLATE_CONTENT_SUCCESS: {
            const { template } = action.payload;
            return { ...state, item: template.content };
        }

        case actionTypes.POST_TEMPLATE_SUCCESS: {
            const { template } = action.payload;

            const templates = [...state.data];
            templates.push({
                id: template.id,
                name: template.name
            });

            return list.getReducer(state, templates);
        }

        case actionTypes.PUT_TEMPLATE_CONTENT_SUCCESS: {
            const { template } = action.payload;
            return { ...state, item: template.content };
        }

        case actionTypes.DELETE_TEMPLATE_SUCCESS: {
            const { templateId } = action.payload;

            const index = state.byId[templateId];
            const newData = [...state.data];

            if (index > -1) {
                newData.splice(index, 1);
            }

            return list.getReducer(state, newData);
        }
        default: {
            return state;
        }
    }
}
