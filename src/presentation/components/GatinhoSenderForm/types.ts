import { FC } from "react";
import { ParseFileToUrl } from "@app/protocols";
import { SendImageUsingFile, SendImageUsingUrl } from "@app/useCases";

export type GatinhoSenderFormState = SendImageUsingFile.Params &
  SendImageUsingUrl.Params;

export type GatinhoSenderFormProps = {
  onSubmit: (value: GatinhoSenderFormState) => void;
  fileToUrlParser: ParseFileToUrl;
};

export type GatinhoSenderFormComponent = FC<GatinhoSenderFormProps>;
