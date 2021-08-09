import React, {
  FocusEventHandler,
  FormEventHandler,
  useRef,
  useState,
} from "react";
import { GatinhoSenderFormComponent } from "../types";
import { Selector } from "../../Selector";
import { Switch } from "../../Switch";
import { UploadButton } from "../../UploadButton";
import { useGatinhoSenderFormManagement } from "../hooks";
import { Button } from "../../Button";

export const GatinhoSenderFormTwo: GatinhoSenderFormComponent = ({
  onSubmit,
  fileToUrlParser,
}) => {
  const [previewSrc, setPreviewSrc] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);

  const { updateImageFile, updateImageUrl, updateNsfw, hasValue, values } =
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

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    onSubmit({ ...values });
  };

  return (
    <form data-testid="gatinhoSenderTwo" onSubmit={handleSubmit}>
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
          fileToUrlParser={fileToUrlParser}
        >
          Add
        </UploadButton>
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
