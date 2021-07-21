/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { FC, ReactElement } from "react";

import {
  ButtonsListItem,
  ButtonsList,
  LeftColumn,
  RightColumn,
  SelectedImage,
  SelectorContainer,
} from "./style";

export type SelectorComponentProps = {
  children?: ReactElement[] | ReactElement;
  src?: string;
};

type SelectorComponent = FC<SelectorComponentProps>;

export const LOADING_IMAGE =
  "https://via.placeholder.com/300x150.png?text=image%20placeholder";

export const ALT_IMAGE_WHEN_SRC_EXISTS = "selected cat image";
export const ALT_IMAGE_WHEN_SRC_NOT_EXISTS = "waiting user add an image";

export const Selector: SelectorComponent = ({ src, children = [] }) => {
  const imageAlt = src
    ? ALT_IMAGE_WHEN_SRC_EXISTS
    : ALT_IMAGE_WHEN_SRC_NOT_EXISTS;

  const renderChildren = () => {
    if (Array.isArray(children)) {
      return children.map((button) => (
        <ButtonsListItem>{button}</ButtonsListItem>
      ));
    }

    return <ButtonsListItem>{children}</ButtonsListItem>;
  };

  return (
    <SelectorContainer>
      <LeftColumn>
        <SelectedImage src={src || LOADING_IMAGE} alt={imageAlt} />
      </LeftColumn>
      <RightColumn>
        <ButtonsList>{renderChildren()}</ButtonsList>
      </RightColumn>
    </SelectorContainer>
  );
};
