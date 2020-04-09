import { createGlobalStyle } from 'styled-components'
import { accent, light, dark, darkest, bgLight, bgDark } from 'constants/theme'

export default createGlobalStyle`
  :root {
    --fontFamilyTitles: 'spectral', serif;
    --fontFamilyBody: 'dosis', sans-serif;
    --fontWeight: lighter;
    --accent: ${accent};
    --light: ${light};
    --dark: ${dark};
    --darkest: ${darkest};
    --bgLight: ${bgLight};
    --bgDark: ${bgDark};
    --color: white;
    --color-trans: rgba(255, 255, 255, .7);
    --borderWidth: 1rem;
    --readable: 60ch;
    --siteBorder: var(--darkest);
  }

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  html {
    box-sizing: border-box;
    font-size: 62.5%;
    height: 100%;
  }
  body {
    height: 100%;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: inherit;
    /* font-family: var(--fontFamilyTitles); */
  }

  body {
    font-family: var(--fontFamilyBody);
    font-weight: var(--fontWeight);
    line-height: normal;
    font-size: 1.6rem;
    color: var(--color);
    background: var(--primary);
    background: linear-gradient(-207deg, var(--bgLight) 0%, var(--bgDark) 100%);
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    -webkit-font-feature-settings: "pnum";
    font-feature-settings: "pnum";
    font-variant-numeric: proportional-nums;

    &.noBorder { --borderWidth: 0 }

    border-left: var(--borderWidth) solid var(--siteBorder);
    border-right: var(--borderWidth) solid var(--siteBorder);
    &:before, &:after {
      content: "";
      position: fixed;
      background: var(--siteBorder);
      left: 0;
      right: 0;
      height: var(--borderWidth);
      z-index: 9999999999;
    }
    &:before { top: 0; }
    &:after { bottom: 0; }
    /* &:after {
      content: '';
      position: fixed;
      top: 0; right: 0; bottom: 0; left: 0;
      width: 100%
      height: 100%;
      z-index: 999;
      pointer-events: none;
      border: var(--borderWidth) solid var(--darkest);
    } */
  }

  ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  a {
    color: var(--white);
    .index & { color: var(--darkest) }
  }

  pre {
    display: block;
    padding: 2rem;
    margin-top: 4rem;
    overflow: auto;
    font-size: 85%;
    line-height: 1.45;
    border-radius: 5px;
    color: var(--accent);
    border: 1px solid #ddd;
    font-family: "SFMono-Regular",Consolas,"Liberation Mono",Menlo,Courier,monospace;
  }

  video {
    max-width: 100%;
  }

  p {
    margin-bottom: 2rem;
  }

  .overlayed {
    background-color: #000;
    color: #fff;
  }
  .read {
    max-width: var(--readable);
  }



  .MarcoItem {
    position: fixed;
    &.top, &.bottom {
      left: 50vw;
      transform: translateX(-50%);
      width: 100vw;
    }
    &.top { top: -10px; }
    &.bottom { bottom: -10px; }

    &.left, &.right {
      height: 110vh !important;
      top: 50%;
      transform: translateY(-50%);
    }
    &.left { left: -10px; }
    &.right { right: -10px; }
  }
  [data-depth].full {
    width: 100%;
    height: 100%;
  }

  .AudioViz {
    .rest, .Player {
      position: fixed;
      width: 100%;
      height: 100%;
      left: 0; top: 0;
    }
    .Player {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .rest {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .controls {
      display: flex;
    }
    .song-info, .song-footer {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 120%;
      svg {
        font-size: 140%;
      }
    }
    .song-alt-link {
      font-size: 80%;
      opacity: .8;
    }
  }
/*
  .marker {
    background-color: red;
    background-image: url('mapbox-icon.png');
    background-size: cover;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
  } */
`
