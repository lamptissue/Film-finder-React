import React, { useRef, useState } from "react";
import { SearchContainer, Input, Wrapper, FaveButtonContainer, Counter, SearchClose, FavouriteButton } from "./style";
import MagnifyingIcon from "../../assets/search.svg";

const FaveButton = ({ showFaves, favefilmIds, toggleShowFaves }) => (
  <FaveButtonContainer>
    <Counter>{favefilmIds}</Counter>
    <FavouriteButton onClick={toggleShowFaves}>{showFaves ? "Hide faves" : "Show faves"}</FavouriteButton>
  </FaveButtonContainer>
);

const Search = ({ filterFilms, showFaves, favefilmIds, toggleShowFaves }) => {
  const inputEl = useRef(null);
  const [showOnDesktop, setShowOnDesktop] = useState(false);

  const handleChange = (event) => {
    filterFilms(event.target.value);
  };

  const clearSearch = () => {
    filterFilms("");
    inputEl.current.value = "";
    setShowOnDesktop(false);
  };

  const toggleSearch = () => {
    setShowOnDesktop((prevState) => !prevState);
  };

  return (
    <Wrapper>
      <FaveButton showFaves={showFaves} favefilmIds={favefilmIds} toggleShowFaves={toggleShowFaves} />
      <SearchContainer $showOnDesktop={showOnDesktop}>
        <img src={MagnifyingIcon} onClick={toggleSearch} style={{ width: "20px" }} />
        <Input ref={inputEl} type='text' name='search' autoComplete='off' onChange={handleChange} />
        <SearchClose onClick={clearSearch} />
      </SearchContainer>
    </Wrapper>
  );
};

export default Search;
