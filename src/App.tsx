import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GatinhoSenderFormState } from "./presentation/components/GatinhoSenderForm/hooks";
import { GatinhoSenderController } from "./controllers";
import {
  GatinhoSenderFormOne,
  GatinhoSenderFormThree,
  GatinhoSenderFormTwo,
} from "./presentation/components/GatinhoSenderForm";
import { RoutesWrapper } from "./presentation/routes";

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
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<RoutesWrapper />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
