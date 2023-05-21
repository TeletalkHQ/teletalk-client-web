import React from "react";
import { createRoot } from "react-dom/client";

import { Provider } from "react-redux";

import "~/others/customGlobals";

import App from "~/App";

import { appConfigs } from "~/classes/AppConfigs";

import reportWebVitals from "~/reportWebVitals";

import { store } from "~/store/store";

appConfigs.setDebugLevel();

const container = document.getElementById("root")!;
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
