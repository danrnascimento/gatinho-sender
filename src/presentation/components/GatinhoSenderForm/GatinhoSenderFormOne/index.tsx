import React, {
  FocusEventHandler,
  FormEventHandler,
  useRef,
  useState,
} from "react";
import { GatinhoSenderFormComponent } from "../types";
import { Button } from "../../Button";
import { Selector } from "../../Selector";
import { Switch } from "../../Switch";
import { UploadButton } from "../../UploadButton";
import { useGatinhoSenderFormManagement } from "../hooks";
import { ReactComponent as LinkIcon } from "../../../../resources/icons/link.svg";

export const GatinhoSenderFormOne: GatinhoSenderFormComponent = ({
  onSubmit,
  fileToUrlParser,
}) => {
  const [previewSrc, setPreviewSrc] = useState<string>();
  const [showURLInput, setShowUrlInput] = useState(false);
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

  const toggleShowUrlInput = () => setShowUrlInput((oldState) => !oldState);

  const handleAddFile = (event: { url: string; file: File }) => {
    const { url, file } = event;

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    setShowUrlInput(false);
    setPreviewSrc(url);
    updateImageFile(file);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    onSubmit({ ...values });
  };

  return (
    <form data-testid="gatinhoSenderOne" onSubmit={handleSubmit}>
      {showURLInput && (
        <input
          type="text"
          placeholder="Cole aqui a URL da imagem de gatinho"
          ref={inputRef}
          onBlur={handleAddViaUrl}
        />
      )}
      <Selector src={previewSrc}>
        <Button
          type="button"
          key="image_url"
          icon={<LinkIcon />}
          onClick={toggleShowUrlInput}
        >
          Add Via URL
        </Button>
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
