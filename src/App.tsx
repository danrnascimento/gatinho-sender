import React from "react";

import { Route, Switch, Router } from "react-router";
import { GatinhoSenderFormState } from "./presentation/components/GatinhoSenderForm/hooks";
import { GatinhoSenderController } from "./controllers";
import {
  GatinhoSenderFormOne,
  GatinhoSenderFormThree,
  GatinhoSenderFormTwo,
} from "./presentation/components/GatinhoSenderForm";
import { createBrowserHistory } from "history";
import { AppContainer, Title } from "./presentation/components";
import { GlobalStyles } from "./presentation/resources/styles/global";

type AppProps = {
  controller: GatinhoSenderController;
};

const useImageSubmission = (controller: AppProps["controller"]) => {
  const handleSubmit = async ({ file, nsfw, url }: GatinhoSenderFormState) => {
    if (!file && !url) {
      return alert("é necessário adicionar um arquivo ou uma url");
    }

    if (url) {
      const saved = await controller.sendImageUsingUrl({ url, nsfw });
      return alert(saved ? "sucesso ao salvar url" : "erro ao salvar url");
    }

    if (file) {
      const saved = await controller.sendImageUsingFile({ file, nsfw });
      return alert(
        saved ? "sucesso ao salvar imagem" : "erro ao salvar imagem"
      );
    }
  };

  return { handleSubmit };
};

function App({ controller }: AppProps) {
  const { handleSubmit } = useImageSubmission(controller);

  return (
    <AppContainer>
      <Title>Gatinho Sender</Title>
      <Router history={createBrowserHistory()}>
        <Switch>
          <Route path="/three">
            <GatinhoSenderFormThree
              onSubmit={handleSubmit}
              fileToUrlParser={URL.createObjectURL}
            />
          </Route>
          <Route path="/two">
            <GatinhoSenderFormTwo
              onSubmit={handleSubmit}
              fileToUrlParser={URL.createObjectURL}
            />
          </Route>
          <Route path="/">
            <GatinhoSenderFormOne
              onSubmit={handleSubmit}
              fileToUrlParser={URL.createObjectURL}
            />
          </Route>
        </Switch>
      </Router>
      <GlobalStyles />
    </AppContainer>
  );
}

export default App;
