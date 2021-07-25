import React from "react";
import { SendImageUsingFile, SendImageUsingUrl } from "../domain";

import {
  GatinhoFormOption,
  GatinhoFormRenderer,
} from "../presentation/ui/containers";
import { GatinhoSenderFormState } from "../presentation/ui/hooks";

type AppProps = {
  controller: SendImageUsingFile & SendImageUsingUrl;
};

function App({ controller }: AppProps) {
  const handleSubmit = async ({ file, nsfw, url }: GatinhoSenderFormState) => {
    if (!file && !url) {
      return alert("é necessário adicionar um arquivo ou url");
    }

    if (url) {
      const saved = await controller.sendImageUsingUrl(url, nsfw);
      return alert(saved ? "sucesso ao salvar url" : "erro ao salvar url");
    }

    if (file) {
      const saved = await controller.sendImageUsingFile(file, nsfw);
      return alert(
        saved ? "sucesso ao salvar imagem" : "erro ao salvar imagem"
      );
    }
  };

  return (
    <div className="App">
      <h1>Gatinho Sender</h1>
      <GatinhoFormRenderer
        formOption={GatinhoFormOption.ONE}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default App;
