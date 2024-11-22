import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import * as Sentry from "@sentry/react";
import store from "./store.js";
import { Provider } from "react-redux";

Sentry.init({
  dsn: "https://5efa7b2aea40d503046973bf0f3e15eb@o4507488002441216.ingest.de.sentry.io/4507528458993744",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 0.2,
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

Sentry.init({
  dsn: "https://5efa7b2aea40d503046973bf0f3e15eb@o4507488002441216.ingest.de.sentry.io/4507528458993744",
  integrations: [
    Sentry.feedbackIntegration({
      colorScheme: "system",
      isNameRequired: true,
    }),
  ],
});

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
