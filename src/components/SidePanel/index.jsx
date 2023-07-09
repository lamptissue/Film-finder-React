import React, { useRef, useEffect } from "react";
import { Panel, Em, P, ClosedWrapper, Background } from "./style";
import { Close } from "../../styles";
import Film from "../Film";
const SidePanel = ({ film, closePanel, state }) => {
  const panelEl = useRef(null);
  const prevFilm = useRef(null);

  useEffect(() => {
    if (prevFilm.current !== film) {
      panelEl.current.scrollTop = 0;
    }
    prevFilm.current = film;
  }, [film, prevFilm]);

  console.log(state);
  return (
    <>
      <Background onClick={closePanel} $state={state} />
      <Panel $state={state} ref={panelEl}>
        <ClosedWrapper onClick={closePanel} $state={state}>
          <Close />
        </ClosedWrapper>
        {film && (
          <>
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
