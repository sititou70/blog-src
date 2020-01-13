import React, { SFC } from "react";
import { useStaticQuery, graphql } from "gatsby";
import Image from "gatsby-image";
import { SocialIcon } from "react-social-icons";

import { style_consts as sc } from "../style/consts";
import styled from "@emotion/styled";

const Footer: SFC<{}> = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          author_introduction
          social {
            twitter
            facebook
            github
          }
        }
      }
    }
  `);

  const { author, author_introduction, social } = data.site.siteMetadata;

  return (
    <Root>
      <div className="footer_title">書いた人</div>
      <div className="bio">
        <Image
          className="author_icon"
          fixed={data.avatar.childImageSharp.fixed}
          alt={author}
        />
        <div>
          <h3>
            <strong>{author}</strong>
          </h3>
          <p>{author_introduction}</p>
        </div>
      </div>
      <div className="social_icons">
        <SocialIcon
          className="social_icon"
          url={`http://twitter.com/${social.twitter}`}
        />
        <SocialIcon
          className="social_icon"
          url={`https://www.facebook.com/profile.php?id=${social.facebook}`}
        />
        <SocialIcon
          className="social_icon"
          url={`https://github.com/${social.github}`}
        />
      </div>
    </Root>
  );
};

const Root = styled.footer`
  margin: ${sc.px.grid(2)} auto ${sc.px.grid()};
  padding: ${sc.px.grid()};

  .footer_title {
    margin-bottom: ${sc.px.grid()};
    text-align: center;
    &::before {
      content: "-";
    }
    &::after {
      content: "-";
    }
  }

  .bio {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    .author_icon {
      min-width: 50px;
      margin-right: ${sc.px.grid(0.5)};
      border-radius: 50%;
    }

    div {
      margin: 0;

      h3,
      p {
        margin: 0;
      }
    }
  }

  .social_icons {
    text-align: center;

    .social_icon {
      margin: ${sc.px.grid()} ${sc.px.grid(0.5)} 0;
      color: ${sc.color.transparent};
      box-shadow: ${sc.shadow.shadow};
      border-radius: 50%;
    }
  }
`;

export default Footer;
