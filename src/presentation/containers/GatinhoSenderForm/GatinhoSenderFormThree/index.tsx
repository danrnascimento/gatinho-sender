import React, { FormEventHandler, useState } from "react";
import { GatinhoSenderFormModule } from "../types";
import { Button } from "../../../components/Button";
import { Selector } from "../../../components/Selector";
import { Switch } from "../../../components/Switch";
import { UploadButton } from "../../../components/UploadButton";
import { useGatinhoSenderFormManagement } from "../../../hooks";

export const GatinhoSenderFormThree: GatinhoSenderFormModule = ({
  onSubmit,
}) => {
  const [previewSrc, setPreviewSrc] = useState<string>();

  const { updateImageFile, updateNsfw, values, valid } =
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
    <form onSubmit={handleSubmit}>
      <UploadButton
        key="image_upload"
        id="image_upload"
        name="image_upload"
        onFileUploaded={handleAddFile}
        fileToUrlParser={URL.createObjectURL}
      >
        Selecione aqui a imagem de gatinho
      </UploadButton>
      <Selector src={previewSrc}>
        <Switch id="nsfw" name="nsfw" onChange={updateNsfw}>
          NSFW
        </Switch>
      </Selector>
      <Button type="submit" disabled={valid}>
        Submit
      </Button>
    </form>
  );
};
