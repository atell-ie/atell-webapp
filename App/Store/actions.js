import auth from "./auth/actions";
import typesList from "./types-list/actions";
import users from "./users/actions";
import app from "./app/actions";
import appSettings from "./app-settings/actions";
import blocks from "./blocks/actions";
import tasks from "./tasks/actions";
import targets from "./targets/actions";
import reports from "./reports/actions";
import reportTemplates from "./report-templates/actions";
import assignments from "./assignments/actions";
import bookings from "./bookings/actions";
import clients from "./clients/actions";
import journeys from "./journeys/actions";
import sessions from "./sessions/actions";
import targetWordsList from "./target-words-list/actions";
import wordsList from "./words-list/actions";
import analysisPhonemes from "./analysis-phonemes/actions";
import results from "./results/actions";
import resultsManager from "./results-manager/actions";
import wordIpas from "./word-ipas/actions";

/**
 * Store actions
 */
export default {
    auth,
    typesList,
    users,
    app,
    clients,
    journeys,
    sessions,
    appSettings,
    blocks,
    tasks,
    targets,
    reports,
    reportTemplates,
    assignments,
    bookings,
    targetWordsList,
    wordsList,
    analysisPhonemes,
    results,
    resultsManager,
    wordIpas
};
