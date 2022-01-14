import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    background-color: #FAA9CB;
    * {     
        font-family: 'Geo', sans-serif;
    }
  }

  #root {
    width: 100%;
    height: 100%
  }
`;
