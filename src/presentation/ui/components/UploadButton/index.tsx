import React, { ChangeEventHandler, FC, PropsWithChildren } from "react";
import { LabelContainer } from "./style";
import { ReactComponent as UploadIcon } from "../../../../resources/icons/upload.svg";

type FileUploadHandler = (params: { url: string; file: File }) => void;

export type UploadButtonComponentProps = PropsWithChildren<{
  id: string;
  name: string;
  className?: string;
  onFileUploaded: FileUploadHandler;
  fileToUrlParser: (file: File) => string;
}>;

type UploadButtonComponent = FC<UploadButtonComponentProps>;

export const UploadButton: UploadButtonComponent = ({
  id,
  name,
  children,
  className,
  onFileUploaded,
  fileToUrlParser,
}) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!event.target.files) {
      return;
    }

    const file = event.target.files[0];
    const url = fileToUrlParser(file);

    onFileUploaded({ file, url });
  };

  return (
    <LabelContainer role="button" htmlFor={id} className={className}>
      <UploadIcon /> {children}
      <input
        id={id}
        name={name}
        type="file"
        onChange={handleChange}
        accept="image/*"
        data-testid="upload_input"
        hidden
      />
    </LabelContainer>
  );
};
