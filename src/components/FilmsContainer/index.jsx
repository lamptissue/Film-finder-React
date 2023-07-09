import React, { useRef, useEffect, useState } from "react";
import { debounce } from "lodash-es";
import { H2, Container, FilmList } from "./style";
import Film from "../Film";

const FilmsContainer = ({ films, pickFilm, isPanelOpen, title }) => {
  const [scroll, setScroll] = useState(0); //this stores the y value in the browser as a pixle value
  const prevPanelState = useRef(false);

  useEffect(() => {
    //this delays invoking a specified function after a certain time has passed
    const handleScroll = debounce(() => {
      setScroll(window.scrollY);
    }, 100); //number of seconds debounce waits before settting setscroll
    if (!isPanelOpen) {
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll); //cleaning up the use effect
    };
  }, [isPanelOpen]); // useeffect will only run when this changes

  //keeping the position on the page the same when the film has been clicked on
  useEffect(() => {
    if (prevPanelState.current && !isPanelOpen) {
      window.scroll(0, scroll);
    }
    prevPanelState.current = isPanelOpen; //we can know if hte panel was just opened or not
  }, [isPanelOpen, prevPanelState, scroll]);

  return (
    <Container $isPanelOpen={isPanelOpen} $top={scroll}>
      <H2>{title}</H2>
      <FilmList>
        {films.map((film) => (
          <Film key={film.id} film={film} pickFilm={pickFilm} />
        ))}
      </FilmList>
    </Container>
  );
};

export default FilmsContainer;
//transient prop wont be passed down to other components
