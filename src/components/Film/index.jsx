import React from "react";

const Film = ({ film }) => (
  <div>
    <h2>Title: {film.Title}</h2>
    <h3>Description: {film.Description}</h3>
    <div></div>
  </div>
);

export default Film;
