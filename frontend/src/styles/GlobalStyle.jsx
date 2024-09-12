import { createGlobalStyle } from 'styled-components';
import HSSantokki2Regular from '../assets/fonts/HSSanTokki2-Regular.woff';
const GlobalStyle = createGlobalStyle`

  @font-face {
    font-family:"HSSantokki2-Regular";
    font-style: normal;
    font-weight: 400;
    src: local("HSSantokki2Regular"), url(${HSSantokki2Regular}) format("woff");
  }

  @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css");

  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    font: inherit;
    vertical-align: baseline;
    border: 0;
  }

  html {
    font-size: 62.5%;
    width: 100%;
  }

  body {
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: #F1F1F1;
  }

  #root{
    width: 100%;
    display: flex;
    justify-content: center;
  }

  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }

  * {
    scrollbar-width: none;
    box-sizing: border-box;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  ol,
  ul {
    list-style: none;
  }

  blockquote,
  q {
    quotes: none;
  }

  blockquote::before,
  blockquote::after,
  q::before,
  q::after {
    content: '';
    content: none;
  }

  table {
    border-spacing: 0;
    border-collapse: collapse;
  }

  button {
    cursor: pointer;
    font: inherit;
    border: none;
    background-color: transparent;
  }



`;

export default GlobalStyle;
