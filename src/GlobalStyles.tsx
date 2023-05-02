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
   
   h1 {
      color: #ddd
   };

   h2, h3, h4 {
      color: #aaa
   }

 #root {
   height: 100vh;
 }
`;

export default GlobalStyles;
