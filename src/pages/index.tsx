import React, { SFC } from "react";
import { graphql } from "gatsby";
import { IndexPageQuery, ImageSharpFluid } from "../../types/graphql-types";

import {
  PostCard as BasePostCard,
  getImageSrcesFromHtmlAst,
} from "../components/PostCard";
import BaseLayout from "../components/layout";
import SEO from "../components/seo";

import { Global } from "@emotion/core";
import { global_style } from "../style/global";
import { style_consts as sc } from "../style/consts";
import styled from "@emotion/styled";

//utils
const getImageSharpFluidFromSrc = (
  src: string,
  fluids: ImageSharpFluid[]
): ImageSharpFluid | undefined => {
  const regexp = new RegExp(src.replace(/\/.{5}\//, "/.+/"));
  return fluids.find(x => {
    return regexp.test(x.src);
  });
};

//components
const PostCards: SFC<{
  posts: IndexPageQuery["allMarkdownRemark"]["edges"];
  image_sharp_fluids: ImageSharpFluid[];
}> = ({ posts, image_sharp_fluids }) => (
  <PostCardsRoot>
    {posts.map(({ node }) => {
      const title = node.frontmatter.title || node.fields.slug;
      const image_srces = getImageSrcesFromHtmlAst(node.htmlAst);
      const first_image_fluid =
        image_srces.length !== 0
          ? getImageSharpFluidFromSrc(image_srces[0], image_sharp_fluids)
          : undefined;

      return (
        <PostCard
          title={title}
          date={node.frontmatter.date}
          to={node.fields.slug}
          image_fluid={first_image_fluid}
          key={node.fields.slug}
        />
      );
    })}
  </PostCardsRoot>
);

const PostCardsRoot = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  margin: ${sc.px.grid()} ${sc.px.grid(0.5)};
`;

const PostCard = styled(BasePostCard)`
  flex: 46%;
  margin: ${sc.px.grid(0.5)};
`;

const Index: SFC<{
  data: IndexPageQuery;
  location: any;
}> = ({ data }) => (
  <Layout
    pathname="/"
    title={data.site.siteMetadata.title}
    subtitle={data.site.siteMetadata.description}
  >
    <Global styles={global_style} />
    <SEO title="All posts" />
    <PostCards
      posts={data.allMarkdownRemark.edges}
      image_sharp_fluids={data.allImageSharp.nodes.map(x => x.fluid)}
    />
  </Layout>
);

const Layout = styled(BaseLayout)`
  max-width: ${sc.px.index_width()};
`;

export const pageQuery = graphql`
  query IndexPage {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { draft: { ne: true } } }
    ) {
      edges {
        node {
          htmlAst
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY/MM/DD")
            title
            draft
          }
        }
      }
    }
    allImageSharp {
      nodes {
        fluid {
          base64
          tracedSVG
          aspectRatio
          src
          srcSet
          srcWebp
          srcSetWebp
          sizes
          originalImg
          originalName
          presentationWidth
          presentationHeight
        }
      }
    }
  }
`;

export default Index;
