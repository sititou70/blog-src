import React, { SFC } from "react";
import Header from "./Header";
import Footer from "./Footer";

import styled from "@emotion/styled";

const Layout: SFC<{
  pathname: string;
  title: string;
  subtitle?: string;
  className?: string;
}> = ({ pathname, title, subtitle, children, className }) => {
  return (
    <Root className={className}>
      {pathname === "/" ? <Header title={title} subtitle={subtitle} /> : null}
      <main>{children}</main>
      <Footer />
    </Root>
  );
};

const Root = styled.div`
  margin: 0 auto;
`;

export default Layout;
