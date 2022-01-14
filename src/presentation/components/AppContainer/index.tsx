import React, { FC } from "react";
import { Title } from "..";
import { Container } from "../Container";
import { GlobalStyles } from "../../resources/styles/global";

export const AppContainer: FC = ({ children }) => {
  return (
    <Container>
      <Title>Gatinho Sender</Title>
      {children}
      <GlobalStyles />
    </Container>
  );
};
