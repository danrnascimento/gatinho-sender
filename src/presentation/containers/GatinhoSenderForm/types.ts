import { FC } from "react";
import { GatinhoSenderFormState } from "../../../presentation/hooks";

export type GatinhoSenderFormProps = {
  onSubmit: (value: GatinhoSenderFormState) => void;
};

export type GatinhoSenderFormModule = FC<GatinhoSenderFormProps>;
