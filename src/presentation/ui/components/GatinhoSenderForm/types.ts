import { FC } from "react";
import { GatinhoSenderFormState } from "../../hooks";

export type GatinhoSenderFormProps = {
  onSubmit: (value: GatinhoSenderFormState) => void;
};

export type GatinhoSenderFormComponent = FC<GatinhoSenderFormProps>;
