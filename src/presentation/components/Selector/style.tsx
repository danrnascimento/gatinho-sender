import styled from "styled-components";

export const SelectorContainer = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  border: 2px solid gray;
  border-radius: 8px;
  overflow: hidden;
  min-height: 350px;
`;

export const LeftColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RightColumn = styled.div`
  display: block;
  border-left: 2px solid gray;
`;

export const SelectedImage = styled.img`
  width: auto;
  height: auto;
  max-height: 350px;
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
  border-bottom: 2px solid gray;
`;
