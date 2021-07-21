import styled from "styled-components";

const INDICATOR_WIDTH = 50;
const CIRCLE_SIZE = 18;

export const SwitchIndicator = styled.div<{ checked: boolean }>`
  display: inline-block;
  width: ${INDICATOR_WIDTH}px;
  height: 16px;
  border-radius: 100px;
  margin-left: 16px;
  background-color: ${({ checked }) => (checked ? "#2F847C" : "#A9B2C3")};
  position: relative;
  display: inline-flex;
  align-items: center;
  transition: all ease 0.3s;

  &:before {
    transition: all ease 0.3s;
    content: "";
    width: 18px;
    height: 18px;
    border-radius: 100%;
    background-color: #fff;
    position: absolute;
    left: ${({ checked }) => (checked ? INDICATOR_WIDTH - CIRCLE_SIZE : 0)}px;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  }
`;
