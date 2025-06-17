import { actionTypes } from "./actions";
import { v4 as uuidv4 } from "uuid";

const appInitialState = {
    initiationId: uuidv4(),
    backgroundSyncEnabled: true,
    backgroundSyncRequest: false,
    netConnected: false,
    reduxStateLoaded: false
};

export { appInitialState };

export default function (state = appInitialState, action) {
    switch (action.type) {
        case actionTypes.APP_STATE_UPDATE: {
            const { appState } = action.payload;
            return { ...state, ...appState };
        }
        default: {
            return state;
        }
    }
}
