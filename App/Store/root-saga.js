import { all } from "redux-saga/effects";
import users from "./users/saga";
import auth from "./auth/saga";
import typesList from "./types-list/saga";
import blocks from "./blocks/saga";
import tasks from "./tasks/saga";
import targets from "./targets/saga";
import reports from "./reports/saga";
import reportTemplates from "./report-templates/saga";
import assignments from "./assignments/saga";
import bookings from "./bookings/saga";
import clients from "./clients/saga";
import journeys from "./journeys/saga";
import sessions from "./sessions/saga";
import targetWordsList from "./target-words-list/saga";
import wordsList from "./words-list/saga";
import analysisPhonemes from "./analysis-phonemes/saga";
import results from "./results/saga";
import wordIpas from "./word-ipas/saga";

/**
 * Root Saga
 */
export default function* () {
    yield all([
        users,
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
        wordIpas
    ]);
}
