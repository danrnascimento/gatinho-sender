import styled, { css } from "styled-components";

export const buttonStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: 2px solid #000;
  padding: 4px 12px;
  font-size: 22px;
  min-width: 100px;
  background-color: #000;
  color: #fff;
  cursor: pointer;

  svg {
    height: 1em;
    fill: #fff;
    margin-right: 4px;
  }

  &:disabled {
    opacity: 0.5;
    background-color: #5c5c5c;
    border-color: #5c5c5c;
    color: 0;
  }
`;

export const StyledButton = styled.button`
  ${buttonStyle}
`;
