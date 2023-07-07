import React from "react";
import Film from "../Film";

const FilmContainer = ({ films }) => (
  <div>
    <h2>All Films</h2>
    <div>
      {films.map((film) => (
        <Film key={film.id} film={film} />
      ))}
    </div>
  </div>
);

export default FilmContainer;
