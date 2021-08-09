import React from "react";

import {
  GatinhoFormOption,
  GatinhoSenderFormRenderer,
} from "./presentation/containers";
import { GatinhoSenderFormState } from "./presentation/components/GatinhoSenderForm/hooks";
import { GatinhoSenderController } from "./presentation/controllers";

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
    <div className="App">
      <h1>Gatinho Sender</h1>

      <GatinhoSenderFormRenderer
        formOption={GatinhoFormOption.THREE}
        onSubmit={handleSubmit}
        fileToUrlParser={URL.createObjectURL}
      />
    </div>
  );
}

export default App;
