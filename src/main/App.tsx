import React from "react";
import { ApiHandler, Validator } from "../infra";

import { GatinhoSenderFormThree } from "../presentation/containers";
import { GatinhoSenderFormState } from "../presentation/hooks";

type AppProps = {
  fileValidator: Validator;
  urlValidator: Validator;
  apiHandler: ApiHandler;
};

function App({ apiHandler, fileValidator, urlValidator }: AppProps) {
  const handleSubmit = ({ file }: GatinhoSenderFormState) => {
    if (file) {
      const isValid = fileValidator.validate(file);
      console.log({ isValid, file });
    }
  };

  return (
    <div className="App">
      <h1>Gatinho Sender</h1>
      <GatinhoSenderFormThree onSubmit={handleSubmit} />
    </div>
  );
}

export default App;
