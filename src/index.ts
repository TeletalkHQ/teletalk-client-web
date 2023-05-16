import React from "react";
import { createRoot } from "react-dom/client";

import { Provider } from "react-redux";

import "src/others/customGlobals";

import App from "src/App";

import { appConfigs } from "src/classes/AppConfigs";

import reportWebVitals from "src/reportWebVitals";

import { store } from "src/store/store";

appConfigs.setDebugLevel();

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);

if (appConfigs.getConfigs().others.logPerformanceMeasuring) {
  reportWebVitals(console.debug);
}
