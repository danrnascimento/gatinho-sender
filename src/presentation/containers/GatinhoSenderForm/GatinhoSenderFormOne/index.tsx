import React, { useState } from "react";
import { GatinhoSenderFormModule } from "../types";
import { Button } from "../../../components/Button";
import { Selector } from "../../../components/Selector";
import { Switch } from "../../../components/Switch";
import { UploadButton } from "../../../components/UploadButton";
import { useGatinhoSenderFormManagement } from "../../../hooks";
import { ReactComponent as LinkIcon } from "../../../../resources/icons/link.svg";

export const GatinhoSenderFormOne: GatinhoSenderFormModule = ({ onSubmit }) => {
  const [previewSrc, setPreviewSrc] = useState<string>();

  const { updateImageFile, updateImageUrl, updateNsfw, valid } =
    useGatinhoSenderFormManagement();

  const handleAddViaUrl = () => {
    const url = window.prompt("Image URL");
    if (!url) {
      return;
    }

    updateImageUrl(url);
    setPreviewSrc(url);
  };

  const handleAddFile = (event: { url: string; file: File }) => {
    const { url, file } = event;
    setPreviewSrc(url);
    updateImageFile(file);
  };

  return (
    <div>
      <Selector src={previewSrc}>
        <Button key="image_url" icon={<LinkIcon />} onClick={handleAddViaUrl}>
          Add Via URL
        </Button>
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
