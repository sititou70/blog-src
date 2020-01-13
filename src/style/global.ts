import { style_consts as sc } from "./consts";
import { css } from "@emotion/core";

export const global_style = css`
  body {
    color: ${sc.color.text};
    background: ${sc.color.bg};
  }

  * {
    box-sizing: border-box;
    max-width: 100%;
    transition: all 0.3s ease;
    word-break: break-word;
  }

  a {
    display: inline-block;
    color: ${sc.color.text};
    overflow: hidden;
    text-decoration: underline;
    text-decoration-color: ${sc.color.key};
    vertical-align: bottom;
    @include sp() {
      font-size: 1.2rem;
    }
    &:hover {
      text-decoration: none;
    }
  }

  button,
  .button {
    margin: ${sc.px.grid(0.5)};
    padding: ${sc.px.grid(0.5)} ${sc.px.grid()};
    color: ${sc.color.text};
    font-size: 1.2rem;
    text-decoration: none;
    border: none;
    border-radius: ${sc.px.border_radius()};
    font-weight: 500;
    background: none;
    cursor: pointer;
    &:hover {
      color: #fff;
      background: ${sc.color.key};
    }
  }
`;
