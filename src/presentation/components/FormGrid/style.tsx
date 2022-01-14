import styled from "styled-components";

export const FormGridContainer = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  border: 4px solid #000;
  overflow: hidden;
  min-height: 350px;
  box-shadow: 14px 12px 0 3px #000;
  margin-bottom: 24px;
  box-sizing: border-box;
`;

export const LeftColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RightColumn = styled.div`
  display: block;
  border-left: 4px solid #000;
`;

export const SelectedImage = styled.img`
  width: 100%;
  height: 100%;
`;

export const ButtonsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

export const ButtonsListItem = styled.li`
  display: flex;
  justify-content: center;
  padding: 16px;
  border-bottom: 4px solid #000;
`;
