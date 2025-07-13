import environment from "./env";

const config = () => {
    const env = environment[process.env.HOST];
    const version = process.env.version;
    return {
        api: {
            authUrl: "https://atell-api.azurewebsites.net",
            domain: "https://auditor.checkventory.com/",
            baseUrl: env.api.url,
            urls: {
                tasks: "/v1/tasks",
                assetSync: "/v1/asset-sync/",
                auditAssignment: "/v1/audit-assignment/",
                auditAssignmentBulkUpdate: "/v1/audit-assignment-bulk-update/",
                auditDownload: "/v1/audit-download/",
                journeys: "v1/journeys/",
                sessions: "v1/sessions/",
                clients: "v1/clients/",
                mediaFiles: "v1/media-files/",
                words: "/words/",
                targetWordsList: "v1/target-words-list",
                targetList: "/target-list/",
                auditSubmissions: "/v1/audit-submissions/",
                reports: "/v1/reports",
                templates: "/v1/templates",
                me: "/v1/me/",
                wordIpas: "/word-ipa",
                typesList: "/types-list/",
                analysisResults: "v1/analysis-result-targets/",
                analysisResultWordIpas: "v1/analysis-word-errors/"
            }
        },
        auth: { ...env.auth, appClientId: env.clientId },
        pagination: {
            rowsPerPageOptions: [10, 20, 50, 100]
        },
        passwordReset: { ...env.passwordReset, clientId: env.clientId },
        paths: {
            // authentication
            auth: "auth",
            login: "login",
            logout: "logout",
            // application
            home: "home",
            profile: "profile",
            journeys: "journeys",
            sessions: "sessions",
            sessionInsights: "session-insights",
            results: "results",
            analysis: "analysis",
            mapping: "mapping",
            wordsList: "words-list",
            words: "words",
            reports: "reports",
            reportTemplates: "report-templates"
            // post MVP
            // blocks: "blocks",
            // exercises: "exercises",
            // clients: "clients",
            // assignments: "assignments",
            // calendar: "calendar",

            // bookings: "bookings",
            // billing: "billing",
        },
        regex: {
            email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            split: /(?=[A-Z0-9])/
        },
        version,
        env: process.env.HOST,
        sentryDsn: env.sentryDsn
    };
};

export default config();
