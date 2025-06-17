import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import App from "./App";
import config from "./App/config";

const env = process.env.HOST;

Sentry.init({
    dsn: config.sentryDsn,
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
    environment: "production",
    enabled: env === "prod"
});

const root = createRoot(document.getElementById("app-root"));
root.render(
    // <StrictMode>
    <App />
    // </StrictMode>
);
