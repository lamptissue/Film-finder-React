import React, { useRef, useState } from "react";
import { SearchContainer, Input, Wrapper, FaveButtonContainer, Counter, SearchClose, FavouriteButton } from "./style";
import MagnifyingIcon from "../../assets/search.svg";
const token = localStorage.getItem("token");

const FaveButton = ({ showFaves, favefilmIds, toggleShowFaves, totalFavoriteFilms }) => (
  <FaveButtonContainer>
    {!token && <Counter>{favefilmIds}</Counter>}
    {token && <Counter>{totalFavoriteFilms}</Counter>}
    <FavouriteButton onClick={toggleShowFaves}>{showFaves ? "Hide faves" : "Show faves"}</FavouriteButton>
  </FaveButtonContainer>
);

const Search = ({ filterFilms, showFaves, favefilmIds, toggleShowFaves, totalFavoriteFilms }) => {
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
      <FaveButton
        showFaves={showFaves}
        favefilmIds={favefilmIds}
        toggleShowFaves={toggleShowFaves}
        totalFavoriteFilms={totalFavoriteFilms}
      />
      <SearchContainer $showOnDesktop={showOnDesktop}>
        <img src={MagnifyingIcon} onClick={toggleSearch} style={{ width: "20px" }} />
        <Input ref={inputEl} type='text' name='search' autoComplete='off' onChange={handleChange} />
        <SearchClose onClick={clearSearch} />
      </SearchContainer>
    </Wrapper>
  );
};

export default Search;
