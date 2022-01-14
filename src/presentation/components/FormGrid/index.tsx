/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { FC, ReactElement } from "react";

import {
  ButtonsListItem,
  ButtonsList,
  LeftColumn,
  RightColumn,
  SelectedImage,
  FormGridContainer,
} from "./style";

export type FormGridComponentProps = {
  children?: ReactElement[] | ReactElement;
  src?: string;
};

type FormGridComponent = FC<FormGridComponentProps>;

export const PLACEHOLDER_IMAGE =
  "https://via.placeholder.com/300x150.png?text=image%20placeholder";

export const ALT_IMAGE_WHEN_SRC_EXISTS = "selected cat image";
export const ALT_IMAGE_WHEN_SRC_NOT_EXISTS = "waiting user add an image";

export const FormGrid: FormGridComponent = ({ src, children = [] }) => {
  const imageAlt = src
    ? ALT_IMAGE_WHEN_SRC_EXISTS
    : ALT_IMAGE_WHEN_SRC_NOT_EXISTS;

  const renderChildren = () => {
    if (Array.isArray(children)) {
      return children.map((button, index) => (
        <ButtonsListItem key={index}>{button}</ButtonsListItem>
      ));
    }

    return <ButtonsListItem>{children}</ButtonsListItem>;
  };

  return (
    <FormGridContainer>
      <LeftColumn>
        <SelectedImage src={src || PLACEHOLDER_IMAGE} alt={imageAlt} />
      </LeftColumn>
      <RightColumn>
        <ButtonsList>{renderChildren()}</ButtonsList>
      </RightColumn>
    </FormGridContainer>
  );
};
