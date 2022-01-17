import { FC } from "react";
import { ParseFileToUrl } from "../../../protocols";
import { SendImageUsingFile, SendImageUsingUrl } from "../../../useCases";

export type GatinhoSenderFormState = SendImageUsingFile.Params &
  SendImageUsingUrl.Params;

export type GatinhoSenderFormProps = {
  onSubmit: (value: GatinhoSenderFormState) => void;
  fileToUrlParser: ParseFileToUrl;
};

export type GatinhoSenderFormComponent = FC<GatinhoSenderFormProps>;
