import React, { useState, useEffect } from "react";
import FilmsContainer from "./components/FilmsContainer";
import Header from "./components/Header";
import { GlobalStyle, LoadingP } from "./styles";
import SidePanel from "./components/SidePanel";
import Search from "./components/Search";
import { Transition } from "react-transition-group";

function App() {
  const [films, setFilms] = useState([]);
  const [showPanel, setShowPanel] = useState(false);
  const [filteredFilms, setFilteredFilms] = useState([]);
  const [showFaves, setShowFaves] = useState(false);
  const favefilmIds = JSON.parse(localStorage.getItem("favefilmIds") || "[]");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //add axios?
    const fetchData = async () => {
      try {
        //get the data from API
        const response = await fetch("https://repulsive-crab-hem.cyclic.app/api/films");
        const data = await response.json(); //convert data to json
        setFilms(data.data.films.map((film) => ({ ...film, isFaved: favefilmIds.includes(film.id) })));
        setLoading(false);
      } catch (error) {
        console.error("There are errors", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Perform initial filtering of films
    setFilteredFilms(films.filter((film) => !film.isFiltered));
  }, [films]);

  const toggleFave = (filmId) => {
    setFilms((films) => {
      const updatedFilms = films.map((film) => (film.id === filmId ? { ...film, isFaved: !film.isFaved } : film));

      localStorage.setItem(
        "favefilmIds",
        JSON.stringify(updatedFilms.filter(({ isFaved }) => isFaved).map(({ id }) => id))
      );
      return updatedFilms;
    });
  };

  const pickFilm = (filmId) => {
    setFilms((films) => films.map((film) => ({ ...film, isPicked: film.id === filmId })));
    setShowPanel(true);
  };

  const closePanel = () => {
    setShowPanel(false);
  };

  const filterFilms = (searchTerm) => {
    const stringSearch = (filmAttribute, searchTerm) => filmAttribute.toLowerCase().includes(searchTerm.toLowerCase());

    setFilms((films) =>
      films.map((film) => {
        const isFiltered = searchTerm
          ? !stringSearch(film.Title, searchTerm) && !stringSearch(film.Director.Name, searchTerm)
          : false;
        return { ...film, isFiltered };
      })
    );
  };

  const toggleShowFaves = () => {
    setShowFaves((showFaves) => !showFaves);
  };
  const hasFiltered = films.some((film) => film.isFiltered);

  const displayFilms = hasFiltered
    ? films.filter((film) => !film.isFiltered)
    : showFaves
    ? films.filter((film) => film.isFaved)
    : films;

  const selectedFilm = films.find((film) => film.isPicked);

  return (
    <>
      <GlobalStyle />
      <Header>
        <Search
          filterFilms={filterFilms}
          showFaves={showFaves}
          toggleShowFaves={toggleShowFaves}
          favefilmIds={favefilmIds.length}
        />
      </Header>
      {loading ? (
        <LoadingP>Hold onto your hat! The films are loading!</LoadingP>
      ) : (
        <FilmsContainer
          films={displayFilms}
          pickFilm={pickFilm}
          isPanelOpen={showPanel}
          title={hasFiltered ? "Search results" : "All Films"}
        />
      )}
      <Transition in={showPanel} timeout={300}>
        {(state) => <SidePanel film={selectedFilm} closePanel={closePanel} toggleFave={toggleFave} state={state} />}
      </Transition>
    </>
  );
}

export default App;
