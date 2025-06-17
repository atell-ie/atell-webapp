import React from "react";
import {
    Home,
    Insights,
    Summarize,
    PlaylistAdd,
    LegendToggle
} from "@mui/icons-material";
import i18next from "../../common/i18n";

export default [
    {
        icon: <Home />,
        key: "home",
        path: "home",
        primary: i18next.t("home")
    },
    {
        icon: <LegendToggle />,
        key: "analysis",
        path: "journeys",
        primary: i18next.t("analysis")
    },
    {
        icon: <Insights />,
        key: "sessionInsight",
        path: "session-insights",
        primary: i18next.t("sessionInsight")
    },
    {
        icon: <PlaylistAdd />,
        key: "wordsList",
        path: "words-list",
        primary: i18next.t("targetList")
    },
    {
        icon: <Summarize />,
        key: "reports",
        path: "reports",
        primary: i18next.t("reports")
    }
];
