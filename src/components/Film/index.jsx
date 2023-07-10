import React from "react";
import { Container, Cover, FilmTitle, Director } from "./style";

const Film = ({ film, pickFilm, isLarge }) => (
  <Container $isLarge={isLarge} onClick={() => pickFilm && pickFilm(film.id)}>
    <Cover alt={`Film poster for ${film.Title} directed by ${film.Director.Name}`} src={film.ImagePath} />
    <figcaption>
      <FilmTitle $isLarge={isLarge}>{film.Title}</FilmTitle>
      <Director $isLarge={isLarge}>{film.Director.Name}</Director>
    </figcaption>
  </Container>
);
export default Film;
