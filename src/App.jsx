import React, { useState, useEffect } from "react";
import FilmContainer from "./components/FilmContainer";

function App() {
  const [films, setFilms] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        //get the data from API
        const response = await fetch("https://repulsive-crab-hem.cyclic.app/api/films");
        const data = await response.json(); //convert data to json
        setFilms(data.data.films);
        console.log(films);
      } catch (error) {
        console.error("There are errors", error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <FilmContainer films={films} />
    </>
  );
}

export default App;
