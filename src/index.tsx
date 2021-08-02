import React from "react";
import ReactDOM from "react-dom";
// import { LocalStorageAdapter } from "./main/adapters";
import { ValidateImageFile, ValidateUrlString } from "./main/validators";
import App from "./main/App";
import { GatinhoSenderController } from "./presentation/controllers/GatinhoSenderController";
import { RestAdapter } from "./main/adapters/RestAdapter";
// import { GraphqlAdapter } from "./main/adapters/GraphqlAdapter";

const urlValidator = new ValidateUrlString();
const fileValidator = new ValidateImageFile();
// const localStorageApiHandler = new LocalStorageAdapter();
// const graphQlApiHandler = new GraphqlAdapter();
const restApiHandler = new RestAdapter();

const controller = new GatinhoSenderController(
  restApiHandler,
  fileValidator,
  urlValidator
);

ReactDOM.render(
  <React.StrictMode>
    <App controller={controller} />
  </React.StrictMode>,
  document.getElementById("root")
);
