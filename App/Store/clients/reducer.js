import list from "../../common/lib/helpers/list";
import getInitialState from "../get-initial-state";
import { actionTypes } from "./actions";

const initialState = getInitialState.list();


export default function (state = { ...initialState }, action) {
    switch (action.type) {
        case actionTypes.CLIENTS_ITEM_SET: {
            const { item } = action.payload;
            return { ...state, item: item };
        }
        case actionTypes.CLIENTS_GET_SUCCESS: {
            const { clients } = action.payload;
            return list.getReducer(state, clients);
        }
        case actionTypes.CLIENTS_POST_SUCCESS: {
            const { newClientData } = action.payload;

            const clients = [...state.data];
            clients.unshift(newClientData);

            return list.getReducer(state, clients);
        }
        case actionTypes.CLIENTS_PUT_SUCCESS: {
            const { updatedClientData } = action.payload;

            const clients = [...state.data];
            const index = clients.findIndex(session => session.id === updatedClientData.id);
            if (index !== -1) {
                clients[index] = updatedClientData;
            }

            return list.getReducer(state, journeys);
        }
        default: {
            return state;
        }
    }
}
