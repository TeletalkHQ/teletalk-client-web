import React from "react";
import { createRoot } from "react-dom/client";

import reportWebVitals from "reportWebVitals";

//! Import before Root component
import "others/customGlobals";

import "temp/playground";

import App from "App";

import { appConfigs } from "classes/AppConfigs";

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
  reportWebVitals(console.log);
}
