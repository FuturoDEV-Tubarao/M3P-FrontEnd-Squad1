import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
      font-family: Arial, Helvetica, sans-serif;
      height: 100vh;
      position: relative; 
      background-color: #F3F3F4;
        overflow: auto; 
      background-size: cover; 
    }
`;

export const ContentWrapper = styled.div`
  position: relative;
  width: 100vw;
  min-height: 100vh;
`;
