import { combineReducers } from "redux";
import reduceReducers from "reduce-reducers";
import users from "./users/reducer";
import auth from "./auth/reducer";
import typesList from "./types-list/reducer";
import app, { appInitialState } from "./app/reducer";
import appSettings from "./app-settings/reducer";
import blocks from "./blocks/reducer";
import tasks from "./tasks/reducer";
import targets from "./targets/reducer";
import reports from "./reports/reducer";
import reportTemplates from "./report-templates/reducer";
import assignments from "./assignments/reducer";
import bookings from "./bookings/reducer";
import clients from "./clients/reducer";
import journeys from "./journeys/reducer";
import sessions from "./sessions/reducer";
import targetWordsList from "./target-words-list/reducer";
import wordsList from "./words-list/reducer";
import analysisPhonemes from "./analysis-phonemes/reducer";
import results from "./results/reducer";
import resultsManager from "./results-manager/reducer";
import wordIpas from "./word-ipas/reducer";
/**
 * Root Reducer
 */
// Updating previously saved redux store from IndexedDB
const injectLoadedReduxState = (state, action) => {
    switch (action.type) {
        case "UPDATE_REDUX_TREE": {
            const { reduxState } = action.payload;
            reduxState["app"] = { ...appInitialState, reduxStateLoaded: true };
            return { ...state, ...reduxState };
        }
        default: {
            return state;
        }
    }
};
export default reduceReducers(
    combineReducers({
        users,
        app,
        appSettings,
        auth,
        typesList,
        blocks,
        tasks,
        targets,
        reports,
        reportTemplates,
        assignments,
        bookings,
        clients,
        journeys,
        sessions,
        targetWordsList,
        wordsList,
        analysisPhonemes,
        results,
        resultsManager,
        wordIpas
    }),
    injectLoadedReduxState
);
