import React, {
  FocusEventHandler,
  FormEventHandler,
  useRef,
  useState,
} from "react";
import { GatinhoSenderFormComponent } from "../types";
import { Button } from "../../Button";
import { FormGrid } from "../../FormGrid";
import { Switch } from "../../Switch";
import { UploadButton } from "../../UploadButton";
import { useGatinhoSenderFormManagement } from "../hooks";
import { ReactComponent as LinkIcon } from "../../../resources/icons/link.svg";
import { Input } from "../..";
import { AddButtonContainer } from "../style";

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
      <FormGrid src={previewSrc}>
        <AddButtonContainer>
          <Button
            type="button"
            key="image_url"
            icon={<LinkIcon />}
            onClick={toggleShowUrlInput}
          >
            Adicione um link de uma imagem
          </Button>
          {showURLInput && (
            <Input
              type="text"
              placeholder="Cole aqui a URL da imagem de gatinho"
              ref={inputRef}
              onBlur={handleAddViaUrl}
            />
          )}
        </AddButtonContainer>
        <AddButtonContainer>
          <UploadButton
            key="image_upload"
            id="image_upload"
            name="image_upload"
            onFileUploaded={handleAddFile}
            fileToUrlParser={fileToUrlParser}
          >
            Selecione aqui a imagem de gatinho
          </UploadButton>
        </AddButtonContainer>
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
