import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
 * {
    font-family: helvetica, sans-serif;
 }
 
 body, html {
    padding: 0;
    margin: 0;
    background-color: #1b1b1b;
 }

 #root {
   height: 100vh;
 }
`;

export default GlobalStyles;
