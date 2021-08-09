import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { makeGraphQlController } from "./factories";

const controller = makeGraphQlController();

ReactDOM.render(
  <React.StrictMode>
    <App controller={controller} />
  </React.StrictMode>,
  document.getElementById("root")
);
