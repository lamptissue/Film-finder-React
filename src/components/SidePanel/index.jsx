import React, { useRef, useEffect } from "react";
import { Panel, Em, P, ClosedWrapper, Background, FavouriteButton } from "./style";
import { Close } from "../../styles";
import Film from "../Film";

const SidePanel = ({ film, closePanel, state, toggleFave }) => {
  const panelEl = useRef(null);
  const prevFilm = useRef(null);

  useEffect(() => {
    if (prevFilm.current !== film) {
      panelEl.current.scrollTop = 0;
    }
    prevFilm.current = film;
  }, [film]);

  return (
    <>
      <Background onClick={closePanel} $state={state} />
      <Panel $state={state} ref={panelEl}>
        <ClosedWrapper onClick={closePanel} $state={state}>
          <Close />
        </ClosedWrapper>

        {film && (
          <>
            <FavouriteButton onClick={() => toggleFave(film._id)}>
              {film.isFaved ? "Remove from Favorites" : "Add to Favorites"}
            </FavouriteButton>
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
