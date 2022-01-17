import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GatinhoSenderController } from "./controllers";
import {
  GatinhoSenderFormOne,
  GatinhoSenderFormThree,
  GatinhoSenderFormTwo,
} from "./presentation/components/GatinhoSenderForm";
import {
  AppContainer,
  GatinhoSenderFormPickerWithNavigate,
} from "./presentation/components";
import { GatinhoSenderFormProps } from "./presentation/components/GatinhoSenderForm/types";
import useImageSubmission from "./hooks/useImageSubmission";

type AppProps = {
  controller: GatinhoSenderController;
};

const PagesWrapper = ({
  onSubmit,
}: Pick<GatinhoSenderFormProps, "onSubmit">) => {
  return (
    <AppContainer>
      <GatinhoSenderFormPickerWithNavigate />
      <Routes>
        <Route
          path="/three"
          element={
            <GatinhoSenderFormThree
              onSubmit={onSubmit}
              fileToUrlParser={URL.createObjectURL}
            />
          }
        />
        <Route
          path="/two"
          element={
            <GatinhoSenderFormTwo
              onSubmit={onSubmit}
              fileToUrlParser={URL.createObjectURL}
            />
          }
        />
        <Route
          path="/*"
          element={
            <GatinhoSenderFormOne
              onSubmit={onSubmit}
              fileToUrlParser={URL.createObjectURL}
            />
          }
        />
      </Routes>
    </AppContainer>
  );
};

function App({ controller }: AppProps) {
  const { handleSubmit } = useImageSubmission(controller);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<PagesWrapper onSubmit={handleSubmit} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
