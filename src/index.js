import React from "react";
import ReactDOM from "react-dom";
import ErrorPage from "./components/ErrorBoundry/ErrorPage";
import App from "./App";

ReactDOM.render(
  <ErrorPage>
    <App />
  </ErrorPage>,
  document.getElementById("root")
);
