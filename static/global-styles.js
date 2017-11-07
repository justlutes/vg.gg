import { injectGlobal } from 'styled-components';

injectGlobal`
  @font-face {
    font-family: 'Bebas Neue';
    src: url('./BebasNeue Regular.woff');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Bebas Neue';
    src: url('./BebasNeue Bold.woff');
    font-weight: 700;
    font-style: normal;
  }

  html, body {
    font-family: 'Montserrat', sans-serif !important;
    background: #304352;
    background: -webkit-linear-gradient(bottom right, #304352, #162851);
    background: -moz-linear-gradient(bottom right, #304352, #162851);
  }

  body, button, input, select, textarea {
    font-family: 'Montserrat', sans-serif !important;
  }

  h1, h2, h3, h4 {
    font-family: 'Bebas Neue', sans-serif !important;
  }
  
  .navbar {
    background: transparent;
  }
`;
