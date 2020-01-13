import React, { SFC } from "react";
import { Link } from "gatsby";
import Image, { FluidObject } from "gatsby-image";
import { ImageSharpFluid } from "../../types/graphql-types";
import { style_consts as sc } from "../style/consts";
import styled from "@emotion/styled";
import { css } from "@emotion/core";

//utils
export const getImageSrcesFromHtmlAst = (current_node?: any): string[] => {
  if (current_node === undefined) return undefined;
  if (typeof current_node !== "object") return undefined;

  let image_src: string[] = [];

  //process current node
  if (current_node.type === "element" && current_node.tagName === "img")
    image_src = [current_node.properties.src];

  //search children
  if (
    current_node.children !== undefined &&
    current_node.children.length !== 0
  ) {
    image_src = [
      ...image_src,
      ...current_node.children
        .map(x => getImageSrcesFromHtmlAst(x))
        .reduce((s, x) => [...s, ...x]),
    ];
  }

  return image_src;
};

//components
export const PostCard: SFC<{
  title: string;
  date: Date;
  to: string;
  image_fluid?: ImageSharpFluid | undefined;
  simple?: boolean;
  className?: string;
}> = ({ title, date, to, image_fluid, simple, className }) => {
  const image =
    image_fluid !== undefined ? (
      <div className="image_container">
        <Image
          className="catch_image"
          fluid={image_fluid as FluidObject}
          loading="lazy"
          alt={title}
        />
      </div>
    ) : null;

  return (
    <PostCardRoot to={to} simple={simple} className={className}>
      {image}
      <span>{date}</span>
      <h2>{title}</h2>
    </PostCardRoot>
  );
};

export const button_style = css`
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
`;

const PostCardRoot = styled(Link)`
  ${button_style}

  position: relative;
  display: block;
  margin: ${sc.px.grid()};
  padding: 0 ${sc.px.grid()} ${sc.px.grid()} ${sc.px.grid()};
  text-decoration: none;
  box-shadow: ${sc.shadow.shadow};
  background: ${sc.color.paper};
  overflow: hidden;
  &:hover {
    box-shadow: ${sc.shadow.shadow};

    .image_container {
      .catch_image {
        transform: scale(1);
        filter: brightness(70%);
      }
    }
  }

  .image_container {
    display: block;
    width: calc(100% + ${sc.px.grid()} * 2);
    max-width: none;
    margin: 0 ${sc.px.grid(-1)};
    overflow: hidden;

    .catch_image {
      width: 100%;
      height: auto;
      max-height: 30vh;
      margin: 0;
      object-fit: cover;
      vertical-align: bottom;
      transform: scale(1.05);
    }
  }

  h2 {
    margin: 0;
    border: none;
    transition: none;
  }

  span {
    display: inline-block;
    width: 100%;
    margin-top: ${sc.px.grid()};
    font-size: 0.9rem;
    transition: none;
  }

  ${(props: { simple: boolean }) =>
    props.simple
      ? css`
          display: flex;
          padding: 0;

          .image_container {
            width: 40%;
            margin: 0;

            .catch_image {
              width: 100%;
              height: 100%;
              max-height: 40vh;
              margin: 0;
            }
          }

          h2 {
            display: flex;
            align-items: center;
            width: 60%;
            margin: ${sc.px.grid()};
            font-size: 1.35rem;
          }

          span {
            display: none;
          }
        `
      : css`
          display: nonde;
        `}
`;

export default PostCard;
