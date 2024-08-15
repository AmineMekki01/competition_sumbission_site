import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
  }

  body {
    background-color: #f0f2f5;
    color: #333;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyle;
