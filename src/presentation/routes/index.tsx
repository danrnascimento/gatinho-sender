import { Route, Routes } from "react-router-dom";
import { GatinhoSenderFormPickerWithNavigate } from "../components";
import {
  GatinhoSenderFormOne,
  GatinhoSenderFormThree,
  GatinhoSenderFormTwo,
} from "../components/GatinhoSenderForm";
import { AppContainer } from "../components";

export const RoutesWrapper = () => {
  return (
    <AppContainer>
      <GatinhoSenderFormPickerWithNavigate />
      <Routes>
        <Route
          path="/three"
          element={
            <GatinhoSenderFormThree
              onSubmit={() => {}}
              fileToUrlParser={URL.createObjectURL}
            />
          }
        />
        <Route
          path="/two"
          element={
            <GatinhoSenderFormTwo
              onSubmit={() => {}}
              fileToUrlParser={URL.createObjectURL}
            />
          }
        />
        <Route
          path="/*"
          element={
            <GatinhoSenderFormOne
              onSubmit={() => {}}
              fileToUrlParser={URL.createObjectURL}
            />
          }
        />
      </Routes>
    </AppContainer>
  );
};
