import React, { useRef, useState } from "react";
import { SearchContainer, Input, Wrapper, FaveButtonContainer, Counter } from "./style";
import MagnifyingIcon from "../../assets/search1.svg";
import { Close, Button } from "../../styles";

const FaveButton = ({ showFaves, favefilmIds, toggleShowFaves }) => (
  <FaveButtonContainer>
    <Counter>{favefilmIds}</Counter>
    <Button onClick={toggleShowFaves}>{showFaves ? "Hide faves" : "Show faves"}</Button>
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
        <img src={MagnifyingIcon} onClick={toggleSearch} />
        <Input ref={inputEl} type='text' name='search' autoComplete='off' onChange={handleChange} />
        <Close onClick={clearSearch} />
      </SearchContainer>
    </Wrapper>
  );
};

export default Search;
