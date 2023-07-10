import React, { useRef, useEffect } from "react";
import { Panel, Em, P, ClosedWrapper, Background } from "./style";
import { Close, Button } from "../../styles";
import Film from "../Film";

const SidePanel = ({ film, closePanel, state, toggleFave }) => {
  const panelEl = useRef(null);
  const prevFilm = useRef(null);

  useEffect(() => {
    if (prevFilm.current !== film) {
      panelEl.current.scrollTop = 0;
    }
    prevFilm.current = film;
  }, [film, prevFilm]);

  return (
    <>
      <Background onClick={closePanel} $state={state} />
      <Panel $state={state} ref={panelEl}>
        <ClosedWrapper onClick={closePanel} $state={state}>
          <Close />
        </ClosedWrapper>

        {film && (
          <>
            <Button onClick={() => toggleFave(film.id)}>
              {film.isFaved ? "Remove favourite book" : "Add favourite book"}
            </Button>
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
