import React, { FocusEventHandler, useRef, useState } from "react";
import { GatinhoSenderFormModule } from "../types";
import { Selector } from "../../../components/Selector";
import { Switch } from "../../../components/Switch";
import { UploadButton } from "../../../components/UploadButton";
import { useGatinhoSenderFormManagement } from "../../../hooks";
import { Button } from "../../../components/Button";

export const GatinhoSenderFormTwo: GatinhoSenderFormModule = ({ onSubmit }) => {
  const [previewSrc, setPreviewSrc] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);

  const { updateImageFile, updateImageUrl, updateNsfw, valid } =
    useGatinhoSenderFormManagement();

  const handleAddViaUrl: FocusEventHandler<HTMLInputElement> = (event) => {
    const url = event.target.value;
    if (!url) {
      return;
    }

    updateImageUrl(url);
    setPreviewSrc(url);
  };

  const handleAddFile = (event: { url: string; file: File }) => {
    const { url, file } = event;

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    setPreviewSrc(url);
    updateImageFile(file);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Cole aqui a URL da imagem de gatinho"
        ref={inputRef}
        onBlur={handleAddViaUrl}
      />
      <Selector src={previewSrc}>
        <UploadButton
          key="image_upload"
          id="image_upload"
          name="image_upload"
          onFileUploaded={handleAddFile}
          fileToUrlParser={URL.createObjectURL}
        >
          Add
        </UploadButton>
        <Switch id="nsfw" name="nsfw" onChange={updateNsfw}>
          NSFW
        </Switch>
      </Selector>
      <Button type="submit" disabled={valid}>
        Submit
      </Button>
    </div>
  );
};
