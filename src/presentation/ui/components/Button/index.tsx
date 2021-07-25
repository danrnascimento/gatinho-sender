import React, {
  ButtonHTMLAttributes,
  FC,
  PropsWithChildren,
  ReactElement,
} from "react";
import { StyledButton } from "./style";

export type ButtonComponentProps = PropsWithChildren<{
  icon?: ReactElement;
}>;

type ButtonComponent = FC<ButtonHTMLAttributes<{}> & ButtonComponentProps>;

export const Button: ButtonComponent = ({
  className,
  children,
  icon,
  ...buttonProps
}) => {
  return (
    <StyledButton className={className} {...buttonProps}>
      {icon} {children}
    </StyledButton>
  );
};
