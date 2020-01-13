import { style_consts as sc } from "./consts";
import { css } from "@emotion/core";

const grid = sc.px.grid;
const article_padding = grid(0.5);

export const post_page_style = css`
  article {
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: ${grid(3)} -${article_padding} ${grid()};
      padding: 0 ${article_padding} ${article_padding};
      max-width: calc(100% + ${article_padding} * 2);
      border-bottom: solid 1px ${sc.color.border};
    }

    h2 + h3,
    h2 + h4,
    h2 + h5,
    h2 + h6,
    h3 + h4,
    h3 + h5,
    h3 + h6,
    h4 + h5,
    h4 + h6,
    h5 + h6 {
      margin-top: ${grid(1.5)};
    }

    p {
      margin: ${grid()} 0;
      padding: 0;
    }

    em {
      font-weight: normal;
      font-style: italic;
    }

    b,
    strong {
      font-weight: bold;
    }

    iframe {
      margin: ${grid()} auto;
    }

    ul,
    ol {
      margin: 0 0 0 ${grid()};

      li {
        margin: 0;
      }

      p {
        margin: 0;
      }
    }

    code {
      border-radius: ${sc.px.border_radius()} !important;
      word-break: break-word !important;
    }

    ,
    .gatsby-resp-image-wrapper {
      position: relative;
      left: 50%;
      width: calc(100% + ${grid(2)});
      margin: 0 !important;
      transform: translateX(-50%);
    }

    table {
      width: 100%;
      margin: ${grid()} 0 0;
      border-collapse: collapse;

      th,
      td {
        padding: ${grid(0.25)} !important;
      }

      thead {
        tr {
          font-weight: bold;
          border-bottom: solid 2px ${sc.color.border};
        }
      }

      tbody {
        tr {
          border-bottom: solid 1px ${sc.color.border};
        }
      }
    }

    blockquote {
      margin: 0 0 0 ${grid()};
      padding: 0 0 0 ${grid()};
      border-left: solid 2px ${sc.color.border};
    }
  }
`;
