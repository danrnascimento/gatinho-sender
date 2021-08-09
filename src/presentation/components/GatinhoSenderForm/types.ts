import { FC } from "react";
import { ParseFileToUrl } from "../../Helpers";
import { GatinhoSenderFormState } from "./hooks";

export type GatinhoSenderFormProps = {
  onSubmit: (value: GatinhoSenderFormState) => void;
  fileToUrlParser: ParseFileToUrl;
};

export type GatinhoSenderFormComponent = FC<GatinhoSenderFormProps>;
