import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FilmsContainer from "./components/FilmsContainer";
import Header from "./components/Header";
import { GlobalStyle, LoadingP } from "./styles";
import SidePanel from "./components/SidePanel";
import Search from "./components/Search";
import Dropdown from "./components/Dropdown";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { Transition } from "react-transition-group";
import Profile from "./components/Profile";
import axios from "axios";

function App() {
  const [films, setFilms] = useState([]);
  const [showPanel, setShowPanel] = useState(false);
  const [filteredFilms, setFilteredFilms] = useState([]);
  const [showFaves, setShowFaves] = useState(false);
  const favefilmIds = JSON.parse(localStorage.getItem("favefilmIds") || "[]");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const fetchData = async () => {
    try {
      if (!token) {
        const response = await fetch("https://repulsive-crab-hem.cyclic.app/api/films");
        const data = await response.json(); //convert data to json
        setFilms(data.data.films.map((film) => ({ ...film, isFaved: favefilmIds.includes(film._id) })));
      }
      if (token) {
        const response = await axios.get("https://repulsive-crab-hem.cyclic.app/api/films");
        const data = response.data.data;
        const favouriteFilmIds = user.favouriteFilms.map((film) => film._id);
        const updatedFilms = data.films.map((film) => ({
          ...film,
          isFaved: favouriteFilmIds.includes(film._id),
        }));
        setFilms(updatedFilms);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching films:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Perform initial filtering of films
    setFilteredFilms(films.filter((film) => !film.isFiltered));
  }, [films]);

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`https://repulsive-crab-hem.cyclic.app/api/users/${user.username}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.status === 200) {
            const favouriteFilmIds = response.data.data.user.favouriteFilms;
            setFilms((films) =>
              films.map((film) => ({
                ...film,
                isFaved: favouriteFilmIds.includes(film._id),
              }))
            );
            setLoading(false);
          }
        } catch (error) {
          console.error("Error fetching favourite films:", error);
        }
      };
      fetchData();
    }
  }, []);

  const toggleFave = async (filmId) => {
    try {
      if (!token) {
        setFilms((films) => {
          const updatedFilms = films.map((film) => (film._id === filmId ? { ...film, isFaved: !film.isFaved } : film));

          localStorage.setItem(
            "favefilmIds",
            JSON.stringify(updatedFilms.filter(({ isFaved }) => isFaved).map(({ _id }) => _id))
          );

          return updatedFilms;
        });
      } else {
        const response = await axios.post(
          `https://repulsive-crab-hem.cyclic.app/api/users/${user.username}/films/${filmId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          // Update state with the response
          setFilms((films) => films.map((film) => (film._id === filmId ? { ...film, isFaved: true } : film)));
        }
      }
    } catch (error) {
      console.error("Error toggling favourite:", error);
    }
  };

  const removeFave = async (filmId) => {
    try {
      if (!token) {
        setFilms((films) => {
          const updatedFilms = films.map((film) => (film._id === filmId ? { ...film, isFaved: !film.isFaved } : film));

          localStorage.setItem(
            "favefilmIds",
            JSON.stringify(updatedFilms.filter(({ isFaved }) => isFaved).map(({ _id }) => _id))
          );

          return updatedFilms;
        });
      } else {
        const response = await axios.delete(
          `https://repulsive-crab-hem.cyclic.app/api/users/${user.username}/films/${filmId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 204) {
          setFilms((films) => films.map((film) => (film._id === filmId ? { ...film, isFaved: false } : film)));
        }
      }
    } catch (error) {
      console.error("Error removing favourite:", error);
    }
  };

  const pickFilm = (filmId) => {
    setFilms((films) => films.map((film) => ({ ...film, isPicked: film._id === filmId })));
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

  const toggleShowFaves = async () => {
    try {
      if (token) {
        setShowFaves((showFaves) => !showFaves);
      } else {
        setShowFaves((prevShowFaves) => {
          if (!prevShowFaves) {
            fetchData();
          }
          return !prevShowFaves;
        });
      }
    } catch (error) {
      console.error("Error toggling show favourites:", error);
    }
  };

  const hasFiltered = films.some((film) => film.isFiltered);

  const displayFilms = hasFiltered
    ? films.filter((film) => !film.isFiltered)
    : showFaves
    ? films.filter((film) => film.isFaved)
    : films;

  const selectedFilm = films.find((film) => film.isPicked);
  const totalFavouriteFilms = films.filter((film) => film.isFaved).length;
  return (
    <>
      <Router>
        <GlobalStyle />
        <Header closePanel={closePanel}>
          <Routes>
            <Route
              path='/'
              element={
                <>
                  <Search
                    filterFilms={filterFilms}
                    showFaves={showFaves}
                    toggleShowFaves={toggleShowFaves}
                    favefilmIds={favefilmIds.length}
                    totalFavouriteFilms={totalFavouriteFilms}
                  />
                </>
              }
            />
          </Routes>
          <Dropdown />
        </Header>
        <Routes>
          <Route
            path='/'
            element={
              loading ? (
                <LoadingP>Hold onto your hat! The films are loading!</LoadingP>
              ) : (
                <FilmsContainer
                  films={displayFilms}
                  pickFilm={pickFilm}
                  isPanelOpen={showPanel}
                  removeFave={removeFave}
                  title={hasFiltered ? "Search results" : "All Films"}
                />
              )
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
        <Transition in={showPanel} timeout={300}>
          {(state) => (
            <SidePanel
              film={selectedFilm}
              closePanel={closePanel}
              toggleFave={toggleFave}
              removeFave={removeFave}
              state={state}
            />
          )}
        </Transition>
      </Router>
    </>
  );
}

export default App;
