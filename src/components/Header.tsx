import React, { SFC } from "react";
import { Link as BaseLink } from "gatsby";

import { style_consts as sc } from "../style/consts";
import styled from "@emotion/styled";

import LogoBaseWhite from "../../assets/sititou70_white.svg";
import BgSvgBase from "../../assets/bg.svg";

const BackGround: SFC<{}> = ({}) => {
  return (
    <>
      <BgSvg />
      <BgGradient />
    </>
  );
};
const BgSvg = styled(BgSvgBase)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 200vh;
  margin: 0;
  padding: 0;
  object-fit: cover;
  object-position: center top;
  z-index: -2;
`;
const BgGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 200vh;
  margin: 0;
  padding: 0;
  background: linear-gradient(${sc.color.key}cc, ${sc.color.bg});
  z-index: -1;
`;

const Header: SFC<{
  title: string;
  subtitle?: string;
}> = ({ title, subtitle }) => (
  <Root>
    <BackGround />
    <span>{subtitle}</span>
    <h1>
      <Link to={`/`} aria-label="sititou70">
        <LogoWhite />
      </Link>
    </h1>
  </Root>
);

const Root = styled.header`
  margin: ${sc.px.grid(4)} ${sc.px.grid()} ${sc.px.grid(2)} ${sc.px.grid(2)};

  h1 a,
  span {
    overflow: visible;
    color: #fff;
    text-shadow: 0 0 20px #000a;
  }

  h1,
  h3 {
    margin: 0;
  }
`;

const LogoWhite = styled(LogoBaseWhite)`
  width: 150px;
  filter: drop-shadow(0 0 5px #000);
`;

const Link = styled(BaseLink)`
  text-decoration: none;
`;

export default Header;
