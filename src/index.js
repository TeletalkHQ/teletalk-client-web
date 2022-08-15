import React from "react";
import { createRoot } from "react-dom/client";

import reportWebVitals from "reportWebVitals";

//! Import before Root component
import "functions/others/customGlobals";

import "temp/playground";

import App from "App";

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(logger.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
