import React, { FormEventHandler, useState } from "react";
import { GatinhoSenderFormComponent } from "../types";
import { Button } from "../../Button";
import { Selector } from "../../Selector";
import { Switch } from "../../Switch";
import { UploadButton } from "../../UploadButton";
import { useGatinhoSenderFormManagement } from "../hooks";

export const GatinhoSenderFormThree: GatinhoSenderFormComponent = ({
  onSubmit,
  fileToUrlParser,
}) => {
  const [previewSrc, setPreviewSrc] = useState<string>();

  const { updateImageFile, updateNsfw, values, hasValue } =
    useGatinhoSenderFormManagement();

  const handleAddFile = (event: { url: string; file: File }) => {
    const { url, file } = event;
    setPreviewSrc(url);
    updateImageFile(file);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    onSubmit({ ...values });
  };

  return (
    <form data-testid="gatinhoSenderThree" onSubmit={handleSubmit}>
      <UploadButton
        key="image_upload"
        id="image_upload"
        name="image_upload"
        onFileUploaded={handleAddFile}
        fileToUrlParser={fileToUrlParser}
      >
        Selecione aqui a imagem de gatinho
      </UploadButton>
      <Selector src={previewSrc}>
        <Switch id="nsfw" name="nsfw" onChange={updateNsfw}>
          NSFW
        </Switch>
      </Selector>
      <Button type="submit" disabled={!hasValue}>
        Enviar
      </Button>
    </form>
  );
};