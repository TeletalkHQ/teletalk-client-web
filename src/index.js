import React from "react";
import { createRoot } from "react-dom/client";

import reportWebVitals from "src/reportWebVitals";

import "src/others/customGlobals";

import App from "src/App";

import { appConfigs } from "src/classes/AppConfigs";

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
