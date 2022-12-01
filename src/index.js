import React from "react";
import { createRoot } from "react-dom/client";

import reportWebVitals from "reportWebVitals";

import "others/customGlobals";

import App from "App";

import { appConfigs } from "classes/AppConfigs";

appConfigs.setDebugLevel();

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);

const {
  others: { logPerformanceMeasuring },
} = appConfigs.getConfigs();
if (logPerformanceMeasuring) {
  reportWebVitals(console.debug);
}
