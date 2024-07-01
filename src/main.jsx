import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot from react-dom/client
import App from "./App.jsx";
import "./index.css";
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://5efa7b2aea40d503046973bf0f3e15eb@o4507488002441216.ingest.de.sentry.io/4507528458993744",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 0.2, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

Sentry.init({
  dsn: "https://5efa7b2aea40d503046973bf0f3e15eb@o4507488002441216.ingest.de.sentry.io/4507528458993744",
  integrations: [
    Sentry.feedbackIntegration({
      // Additional SDK configuration goes in here, for example:
      colorScheme: "system",
      isNameRequired: true,
    }),
  ],
});

createRoot(document.getElementById("root")).render(
  // Use createRoot instead of ReactDOM.render
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
