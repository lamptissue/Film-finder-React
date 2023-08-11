import React from "react";
import { HeaderContainer, HeaderTest } from "./style";
// import user from "../../assets/user.svg";

const Header = ({ children }) => (
  <HeaderContainer>
    <a href='/'>
      <h1>Film Finder</h1>
    </a>
    <HeaderTest>{children}</HeaderTest>
    {/*this is where the search componenet renders*/}
  </HeaderContainer>
);

export default Header;
