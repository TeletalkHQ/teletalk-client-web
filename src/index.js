import { render } from "react-dom";
import { StrictMode } from "react";

import reportWebVitals from "~/reportWebVitals";

import "~/functions/others/globals";

console.log(logger);

// import App from "~/App";

render(
  <StrictMode>{/* <App /> */}</StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(logger.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
