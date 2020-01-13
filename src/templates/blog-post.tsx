import React, { SFC } from "react";
import { Link, graphql } from "gatsby";

import {
  BlogPostBySlugQuery,
  SitePageContext,
} from "../../types/graphql-types";

import BaseLayout from "../components/layout";
import SEO from "../components/seo";
import { Disqus } from "gatsby-plugin-disqus";

import { Global } from "@emotion/core";
import { global_style } from "../style/global";
import { post_page_style } from "../style/post-page";

import { style_consts as sc } from "../style/consts";
import styled from "@emotion/styled";

const TopLink = () => (
  <nav>
    <Link className="top_link" to="/">
      記事一覧
    </Link>
  </nav>
);

const BlogPostTemplate: SFC<{
  data: BlogPostBySlugQuery;
  pageContext: SitePageContext;
}> = ({ data, pageContext }) => {
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata.title;
  const url = data.site.siteMetadata.siteUrl + pageContext.slug;
  let disqusConfig = {
    url,
    identifier: post.id,
    title: post.frontmatter.title,
  };

  return (
    <Layout pathname={pageContext.slug} title={siteTitle}>
      <Global styles={global_style} />
      <Global styles={post_page_style} />
      <SEO title={post.frontmatter.title} description={post.excerpt} />
      <TopLink />
      <article>
        <header>
          <h1>{post.frontmatter.title}</h1>
          <span>{post.frontmatter.date}</span>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
      <Disqus className="disqus" config={disqusConfig} />
      <TopLink />
    </Layout>
  );
};
const Layout = styled(BaseLayout)`
  max-width: ${sc.px.postpage_width()};
  padding: 0 ${sc.px.grid()};

  nav {
    .top_link {
      display: flex;
      align-items: center;
      margin-top: ${sc.px.grid()};

      &::before {
        content: "";
        display: inline-block;
        margin-right: ${sc.px.grid(0.25)};
        border: ${sc.px.grid(0.25)} solid;
        border-color: ${sc.color.transparent} ${sc.color.text}
          ${sc.color.transparent} ${sc.color.transparent};
      }
    }
  }

  article {
    header {
      h1 {
        display: block;
        margin: ${sc.px.grid(2)} 0 0 0;
      }

      span {
        display: block;
        margin-top: ${sc.px.grid(0.5)};
      }
    }
    section {
      margin-top: ${sc.px.grid(2)};
    }
  }

  .disqus {
    margin-top: ${sc.px.grid(3)};
  }
`;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "YYYY/MM/DD")
      }
    }
  }
`;

export default BlogPostTemplate;
