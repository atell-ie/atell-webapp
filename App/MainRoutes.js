import React from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import config from "./config";

import Auth from "./Auth";
import Login from "./Login";
import Logout from "./Logout";

// import Blocks from "./Blocks";
// import UserJourney from "./UserJourney";
// import Exercise from "./UserJourney/Exercise";
// import Clients from "./Clients";
// import ClientDetails from "./Clients/ClientDetails";
// import Assignments from "./Assignments";
// import Assignment from "./Assignment";
// // import Calendar from "./Calendar";
import Home from "./Home";
import Profile from "./User/Profile";
import Reports from "./Reports";
import ReportEditor from "./ReportEditor";
import Journeys from "./Journeys";
import Sessions from "./Sessions";
import Results from "./Results";
import Analysis from "./Results/Analysis";
import Mapping from "./Results/Mapping";
import WordsList from "./WordsList";
import SessionInsights from "./SessionInsights";
// import Bookings from "./Bookings";
// import BookingsConfig from "./Bookings/BookingConfig";
// import Billing from "./Billing";

const paths = {
    // authentication
    auth: `/${config.paths.auth}`,
    login: `/${config.paths.login}`,
    logout: `/${config.paths.logout}`,
    // application
    home: `${config.paths.home}`,
    profile: `${config.paths.profile}`,
    reports: `${config.paths.reports}`,
    reportTemplates: `${config.paths.reportTemplates}`,
    journeys: `${config.paths.journeys}`,
    sessions: `${config.paths.sessions}`,
    results: `${config.paths.results}`,
    analysis: `${config.paths.analysis}`,
    mapping: `${config.paths.mapping}`,
    wordsList: `${config.paths.wordsList}`,
    sessionInsights: `${config.paths.sessionInsights}`
    // post MVP
    // blocks: `${config.paths.blocks}`,
    // exercises: `${config.paths.exercises}`,
    // clients: `${config.paths.clients}`,
    // assignments: `${config.paths.assignments}`,
    // calendar: `${config.paths.calendar}`,
    // bookings: `${config.paths.bookings}`,
    // billing: `${config.paths.billing}`,
};

const NoMatch = () => {
    return <div>route not found</div>;
};

/**
 * App Routes Component
 */
export default () => {
    return (
        <Routes>
            <Route index element={<Login />} />
            <Route path={paths.auth} element={<Auth />}>
                <Route index element={<Home />} />
                <Route path={paths.home} element={<Home />} />

                {/* 
                    /journeys 
                */}

                <Route path={paths.journeys} element={<Outlet />}>
                    <Route index element={<Journeys />} />
                    <Route path={":journeyId"} element={<Outlet />}>
                        <Route index element={<Journeys />} />
                        <Route path={paths.sessions} element={<Outlet />}>
                            <Route index element={<Sessions />} />
                        </Route>
                    </Route>
                </Route>

                {/* 
                    /sessions 
                */}

                <Route path={paths.sessions} element={<Outlet />}>
                    <Route index element={<Sessions />} />
                    {/* <Route path={":sessionId"} element={<Outlet />}>

                    </Route> */}
                </Route>

                <Route path={paths.sessionInsights} element={<Outlet />}>
                    <Route index element={<SessionInsights />} />
                </Route>

                <Route path={paths.results} element={<Results />}>
                    <Route path={":sessionId"} element={<Outlet />}>
                        <Route path={paths.analysis} element={<Analysis />} />
                        <Route path={paths.mapping} element={<Mapping />} />
                    </Route>
                </Route>

                {/* 
                    /analysis 
                */}

                {/* <Route path={paths.analysis} element={<Outlet />}>
                    <Route index element={<Analysis />} />
                    <Route path={":analysisId"} element={<Analysis />} />
                </Route> */}

                {/* 
                    /words-list 
                */}

                <Route path={paths.wordsList} element={<Outlet />}>
                    <Route index element={<WordsList />} />
                    {/* <Route path={":analysisId"} element={<Analysis />} /> */}
                </Route>

                <Route path={paths.profile} element={<Profile />} />

                {/* 
                    /blocks/:blockId -> /tasks/:taskId
                */}

                {/* <Route path={paths.blocks} element={<Outlet />}>
                    <Route index element={<Blocks />} />
                    <Route path={":blockId"} element={<Outlet />}>
                        <Route index element={<UserJourney />} />
                        <Route path={paths.exercises} element={<Outlet />}>
                            <Route index element={<UserJourney />} />
                            <Route
                                path={":exerciseId"}
                                element={<Exercise />}
                            />
                            <Route path="*" element={<NoMatch />} />
                        </Route>
                    </Route>
                </Route> */}

                {/* <Route path={paths.tasks} element={<Outlet />}>
                    <Route index element={<Tasks />} />
                    <Route path={":taskId"} element={<Task />} />
                </Route> */}

                {/* 
                    /clients 
                */}

                {/* <Route path={paths.clients} element={<Outlet />}>
                    <Route index element={<Clients />} />
                    <Route path={":clientId"} element={<ClientDetails />} />
                </Route> */}

                {/*
                    /assignments/:assignmentId
                */}
                {/* <Route path={paths.assignments} element={<Outlet />}>
                    <Route index element={<Assignments />} />
                    <Route path={":assignmentId"} element={<Outlet />}>
                        <Route index element={<Assignment />} />
                    </Route>
                </Route> */}

                {/* <Route path={paths.calendar} element={<Calendar />} /> NOT FOR MVP  */}
                <Route path={paths.reports} element={<Outlet />}>
                    <Route index element={<Reports />} />
                    <Route path={":reportId"} element={<ReportEditor />} />
                </Route>

                <Route path={paths.reportTemplates} element={<Outlet />}>
                    <Route index element={<div>Error 404</div>} />
                    <Route path={":templateId"} element={<ReportEditor />} />
                </Route>

                {/*
                    /bookings
                */}
                {/* <Route path={paths.bookings} element={<Outlet />}>
                    <Route index element={<Bookings />} />
                    <Route path={"settings"} element={<BookingsConfig />} />
                </Route> */}

                {/* <Route path={paths.billing} element={<Billing />} /> NOT FOR MVP */}

                {/* <Route path={paths.audits} element={<Wrp><Main title="Home" /></Wrp>} /> */}
                {/* <Route path={paths.audits} element={<Outlet />}> */}
                {/* <Route index element={<Audits />} /> */}
                {/* <Route path={"list"} element={<Audits />} /> */}
                {/* /auth/audits/1 */}
                {/* <Route path={":auditId"} element={<Audit />}>
                        <Route path={"details"} element={<AuditDetails />} />
                        {/* /auth/audits/1/assets */}
                {/* <Route path={"assets"} element={<Outlet />}> */}
                {/* <Route path={"list"} element={<AuditAssets />} /> */}
                {/* <Route
                                path={"exclude-remaining"}
                                element={<AuditAssetExclude />}
                            /> */}
                {/* /auth/audits/1/assets/1 */}
                {/* <Route path={":assetId"} element={<AuditAsset />}> */}
                {/* <Route
                                    path={"details"}
                                    element={<AssetDetails />}
                                /> */}
                {/* <Route
                                    path={"exclude"}
                                    element={<AuditAssetExclude />}
                                /> */}
                {/* </Route> */}
                {/* </Route> */}
                {/* <Route path={"new-asset"} element={<AltAsset />} />
                        <Route path={"search"} element={<AssetSearch />} />
                        <Route path={"submit"} element={<AuditSubmission />} /> */}
                {/* </Route> */}
                {/* </Route> */}
                {/* <Route path={paths.auditAssets} element={<AuditAssets />} /> */}
                {/* <Route path={paths.settings} element={<Settings />} /> */}
            </Route>
            <Route path={paths.login} element={<Login />} />
            <Route path={paths.logout} element={<Logout />} />
        </Routes>
    );
};

/*
TODO: is it possible to tidy up above nesting hell with v6?
*/
