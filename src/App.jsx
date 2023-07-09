import React, { useState, useEffect } from "react";
import FilmsContainer from "./components/FilmsContainer";
import Header from "./components/Header";
import { GlobalStyle } from "./styles";
import SidePanel from "./components/SidePanel";
import Search from "./components/Search";
import { Transition } from "react-transition-group";

function App() {
  const [films, setFilms] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [showPanel, setShowPanel] = useState(false);
  const [filteredFilms, setFilteredFilms] = useState([]);

  useEffect(() => {
    //add axios?
    const fetchData = async () => {
      try {
        //get the data from API
        const response = await fetch("https://repulsive-crab-hem.cyclic.app/api/films");
        const data = await response.json(); //convert data to json
        setFilms(data.data.films);
        // setFilteredFilms(films);
      } catch (error) {
        console.error("There are errors", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Perform initial filtering of films
    setFilteredFilms(films);
  }, [films]);

  const pickFilm = (film) => {
    setSelectedFilm(film);
    setShowPanel(true);
  };

  const closePanel = () => {
    setShowPanel(false);
  };

  const filterFilms = (searchTerm) => {
    const stringSearch = (filmAttribute, searchTerm) => filmAttribute.toLowerCase().includes(searchTerm.toLowerCase());

    if (!searchTerm) {
      setFilteredFilms(films);
    } else {
      setFilteredFilms(
        films.filter((film) => stringSearch(film.Title, searchTerm) || stringSearch(film.Director.Name, searchTerm))
      );
    }
  };

  const hasFiltered = filteredFilms.length !== films.length;

  return (
    <>
      <GlobalStyle />
      <Header>
        <Search filterFilms={filterFilms} />
      </Header>
      <FilmsContainer
        films={filteredFilms}
        pickFilm={pickFilm}
        isPanelOpen={showPanel}
        title={hasFiltered ? "Search results" : "All Films"}
      />
      <Transition in={showPanel} timeout={300}>
        {(state) => <SidePanel film={selectedFilm} closePanel={closePanel} state={state} />}
      </Transition>
    </>
  );
}

export default App;
