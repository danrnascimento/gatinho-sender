import styled, { css } from "styled-components";

export const buttonStyle = css`
  display: flex;
  align-items: center;
  background: none;
  border: 1px solid #000;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 16px;

  svg {
    height: 1em;
    margin-right: 4px;
  }
`;

export const StyledButton = styled.button`
  ${buttonStyle}
`;
