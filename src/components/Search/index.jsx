import React, { useRef, useState } from "react";
import { SearchContainer, Input, Wrapper, FaveButtonContainer, Counter, SearchClose, FavouriteButton } from "./style";
import MagnifyingIcon from "../../assets/search.svg";
const token = localStorage.getItem("token");

const FaveButton = ({ showFaves, toggleShowFaves, totalFavouriteFilms }) => (
  <FaveButtonContainer>
    <Counter>{totalFavouriteFilms}</Counter>
    <FavouriteButton onClick={toggleShowFaves}>{showFaves ? "Hide faves" : "Show faves"}</FavouriteButton>
  </FaveButtonContainer>
);

const Search = ({ filterFilms, showFaves, toggleShowFaves, totalFavouriteFilms }) => {
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
      <FaveButton showFaves={showFaves} toggleShowFaves={toggleShowFaves} totalFavouriteFilms={totalFavouriteFilms} />
      <SearchContainer $showOnDesktop={showOnDesktop}>
        <img src={MagnifyingIcon} onClick={toggleSearch} style={{ width: "20px" }} />
        <Input ref={inputEl} type='text' name='search' autoComplete='off' onChange={handleChange} />
        <SearchClose onClick={clearSearch} />
      </SearchContainer>
    </Wrapper>
  );
};

export default Search;
