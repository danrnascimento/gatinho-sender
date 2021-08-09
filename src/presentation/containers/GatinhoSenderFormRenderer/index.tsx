import React, { FC } from "react";
import {
  GatinhoSenderFormOne,
  GatinhoSenderFormThree,
  GatinhoSenderFormTwo,
} from "../../components/GatinhoSenderForm";
import { GatinhoSenderFormProps } from "../../components/GatinhoSenderForm/types";

export enum GatinhoFormOption {
  ONE,
  TWO,
  THREE,
}

type GatinhoSenderFormRendererComponent = FC<
  GatinhoSenderFormProps & { formOption: GatinhoFormOption }
>;

export const GatinhoSenderFormRenderer: GatinhoSenderFormRendererComponent = ({
  formOption,
  ...gatinhoFormProps
}) => {
  switch (formOption) {
    case GatinhoFormOption.THREE:
      return <GatinhoSenderFormThree {...gatinhoFormProps} />;
    case GatinhoFormOption.TWO:
      return <GatinhoSenderFormTwo {...gatinhoFormProps} />;
    default:
      return <GatinhoSenderFormOne {...gatinhoFormProps} />;
  }
};
