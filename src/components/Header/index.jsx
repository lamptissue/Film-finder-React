import React from "react";
import { HeaderContainer } from "./style";

const Header = ({ children }) => (
  <HeaderContainer>
    <h1>Film Finder</h1>
    {children} {/*this is where the search componenet renders*/}
  </HeaderContainer>
);

export default Header;
