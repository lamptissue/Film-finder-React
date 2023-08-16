import React, { useRef, useEffect } from "react";
import { Panel, Em, P, ClosedWrapper, Background, FavouriteButton } from "./style";
import { Close } from "../../styles";
import Film from "../Film";

const SidePanel = ({ film, closePanel, state, toggleFave, removeFave }) => {
  const panelEl = useRef(null);
  const prevFilm = useRef(null);

  useEffect(() => {
    if (prevFilm.current !== film) {
      panelEl.current.scrollTop = 0;
    }
    prevFilm.current = film;
  }, [film]);

  const renderFavouriteButton = () => {
    if (film.isFaved) {
      return <FavouriteButton onClick={() => removeFave(film._id)}>Remove from Favorites</FavouriteButton>;
    } else {
      return <FavouriteButton onClick={() => toggleFave(film._id)}>Add to Favorites</FavouriteButton>;
    }
  };

  return (
    <>
      <Background onClick={closePanel} $state={state} />
      <Panel $state={state} ref={panelEl}>
        <ClosedWrapper onClick={closePanel} $state={state}>
          <Close />
        </ClosedWrapper>

        {film && (
          <>
            {renderFavouriteButton()}
            <Film film={film} isLarge={true} />

            <P>{film.Description}</P>
            <P>
              <Em>{film.Date}</Em>
            </P>
          </>
        )}
      </Panel>
    </>
  );
};

export default SidePanel;
