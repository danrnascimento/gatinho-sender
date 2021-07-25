import React from "react";
import ReactDOM from "react-dom";
import { LocalStorageCommunicationAdapter } from "./main/adapters";
import { ValidateImageFile, ValidateUrlString } from "./main/validators";
import App from "./main/App";
import { GatinhoSenderController } from "./presentation/controllers/GatinhoSenderController";

const urlValidator = new ValidateUrlString();
const fileValidator = new ValidateImageFile();
const apiHandler = new LocalStorageCommunicationAdapter();

const controller = new GatinhoSenderController(
  apiHandler,
  fileValidator,
  urlValidator
);

ReactDOM.render(
  <React.StrictMode>
    <App controller={controller} />
  </React.StrictMode>,
  document.getElementById("root")
);
