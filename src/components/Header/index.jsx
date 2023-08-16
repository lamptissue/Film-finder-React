import React from "react";
import { HeaderContainer, HeaderChildrenContainer } from "./style";

const Header = ({ children, closePanel }) => (
  <HeaderContainer onClick={closePanel}>
    <a href='/'>
      <h1>Film Finder</h1>
    </a>
    <HeaderChildrenContainer>{children}</HeaderChildrenContainer>
    {/*this is where the search componenet renders*/}
  </HeaderContainer>
);

export default Header;
