import React, { useRef, useState } from "react";
import { SearchContainer, Input, Wrapper } from "./style";
import MagnifyingIcon from "../../assets/search1.svg";
import { Close } from "../../styles";

const Search = ({ filterFilms }) => {
  const inputEl = useRef(null);
  const [showOnDesktop, setShowOnDesktop] = useState(false);

  const handleChange = (event) => {
    filterFilms(event.target.value);
  };

  const clearSearch = () => {
    filterFilms("");
    inputEl.current.value = "";
    // setShowOnDesktop(false);
  };

  const toggleSearch = () => {
    setShowOnDesktop((prevState) => !prevState);
  };

  return (
    <Wrapper>
      <SearchContainer $showOnDesktop={showOnDesktop}>
        <img src={MagnifyingIcon} onClick={toggleSearch} />{" "}
        <Input ref={inputEl} type='text' name='search' autoComplete='off' onChange={handleChange} />
        <Close onClick={clearSearch} />
      </SearchContainer>
    </Wrapper>
  );
};

export default Search;
