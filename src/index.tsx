import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ControllerType, makeController } from "./factories";

const controller = makeController(ControllerType.GRAPHQL);

ReactDOM.render(
  <React.StrictMode>
    <App controller={controller} />
  </React.StrictMode>,
  document.getElementById("root")
);
