import React, { FormEventHandler, useState } from "react";
import { GatinhoSenderFormComponent } from "../types";
import { Button } from "../../Button";
import { FormGrid } from "../../FormGrid";
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
      <FormGrid src={previewSrc}>
        <UploadButton
          key="image_upload"
          id="image_upload"
          name="image_upload"
          onFileUploaded={handleAddFile}
          fileToUrlParser={fileToUrlParser}
        >
          Selecione aqui a imagem de gatinho
        </UploadButton>
        <Switch id="nsfw" name="nsfw" onChange={updateNsfw}>
          NSFW
        </Switch>
      </FormGrid>
      <Button type="submit" disabled={!hasValue}>
        Enviar
      </Button>
    </form>
  );
};
