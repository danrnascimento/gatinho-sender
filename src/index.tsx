import React from "react";
import ReactDOM from "react-dom";
import { LocalStorageAdapter } from "./infra";
import { ValidateImageFile, ValidateUrlString } from "./infra/validators";
import App from "./main/App";

const urlValidator = new ValidateUrlString();
const fileValidator = new ValidateImageFile();
const apiHandler = new LocalStorageAdapter();

ReactDOM.render(
  <React.StrictMode>
    <App
      apiHandler={apiHandler}
      fileValidator={fileValidator}
      urlValidator={urlValidator}
    />
  </React.StrictMode>,
  document.getElementById("root")
);
