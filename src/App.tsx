import React from "react";
import { SendImageUsingFile, SendImageUsingUrl } from "./useCases";

import {
  GatinhoFormOption,
  GatinhoSenderFormRenderer,
} from "./presentation/containers";
import { GatinhoSenderFormState } from "./presentation/components/GatinhoSenderForm/hooks";

type AppProps = {
  controller: SendImageUsingFile & SendImageUsingUrl;
};

const useImageSubmission = (controller: AppProps["controller"]) => {
  const handleSubmit = async ({ file, nsfw, url }: GatinhoSenderFormState) => {
    if (!file && !url) {
      return alert("é necessário adicionar um arquivo ou url");
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
        formOption={GatinhoFormOption.TWO}
        onSubmit={handleSubmit}
        fileToUrlParser={URL.createObjectURL}
      />
    </div>
  );
}

export default App;