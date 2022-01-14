import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "..";
import { List } from "./style";

enum FormChoice {
  ONE = "one",
  TWO = "two",
  THREE = "three",
}

type GatinhoSenderFormPickerProps = {
  onPickForm: (formName: FormChoice) => void;
};

export const GatinhoSenderFormPicker = ({
  onPickForm,
}: GatinhoSenderFormPickerProps) => {
  return (
    <List>
      <li>
        <Button onClick={() => onPickForm(FormChoice.ONE)}>Formulário 1</Button>
      </li>
      <li>
        <Button onClick={() => onPickForm(FormChoice.TWO)}>Formulário 2</Button>
      </li>
      <li>
        <Button onClick={() => onPickForm(FormChoice.THREE)}>
          Formulário 3
        </Button>
      </li>
    </List>
  );
};

export const GatinhoSenderFormPickerWithNavigate = () => {
  const navigate = useNavigate();
  return (
    <GatinhoSenderFormPicker
      onPickForm={(formName) => navigate(`/${formName}`)}
    />
  );
};
