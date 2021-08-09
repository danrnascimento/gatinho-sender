import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { makeLocalStorageController } from "./factories";

const controller = makeLocalStorageController();

ReactDOM.render(
  <React.StrictMode>
    <App controller={controller} />
  </React.StrictMode>,
  document.getElementById("root")
);
