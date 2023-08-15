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
  const [FaveouriteFilms, setFavouriteFilms] = useState([]);
  const [userFavouritedFilmIds, setUserFavouritedFilmIds] = useState([]);

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
      const updatedFilms = films.map((film) => (film._id === filmId ? { ...film, isFaved: !film.isFaved } : film));

      if (!token) {
        localStorage.setItem(
          "favefilmIds",
          JSON.stringify(updatedFilms.filter(({ isFaved }) => isFaved).map(({ _id }) => _id))
        );
      }
      if (token) {
        const filmToUpdate = updatedFilms.find((film) => film._id === filmId);
        if (filmToUpdate.isFaved) {
          addFilmToFavourites(filmId);
        } else {
          removeFilmFromFavourites(filmId);
        }
      }
      return updatedFilms;
    });
  };

  useEffect(() => {
    // Fetch the user's favorite films when the page loads
    if (token) {
      axios
        .get(`https://repulsive-crab-hem.cyclic.app/api/users/${user.username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const favoriteFilmIds = response.data.data.user.favouriteFilms;
          setFavouriteFilms(favoriteFilmIds);
        })
        .catch((error) => {
          console.error("Error fetching user's favorite films:", error);
        });
    }
  }, [token, user.username]);
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

  const addFilmToFavourites = (filmId) => {
    axios
      .post(
        `https://repulsive-crab-hem.cyclic.app/api/users/${user.username}/films/${filmId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setFavouriteFilms((prevFavouriteFilms) => [...prevFavouriteFilms, filmId]);
        setFilms((films) => films.map((film) => (film._id === filmId ? { ...film, isFaved: true } : film)));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeFilmFromFavourites = (filmId) => {
    // axios
    //   .delete(
    //     `https://repulsive-crab-hem.cyclic.app/api/users/${user.username}/films/${filmId}`,
    //     {},
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     console.log(response);
    //     setFavouriteFilms((prevFavouriteFilms) => prevFavouriteFilms.filter((id) => id !== filmId));
    //     setFilms((films) => films.map((film) => (film._id === filmId ? { ...film, isFaved: false } : film)));
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    axios
      .delete(`https://repulsive-crab-hem.cyclic.app/api/users/${user.username}/films/${filmId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        // Update the favorite films state after successful deletion
        setFavouriteFilms((prevFilms) => prevFilms.filter((id) => id !== filmId));
      })
      .catch((error) => {
        console.error("Error deleting film:", error);
      });
  };
  console.log("This is your captain speaking", FaveouriteFilms);
  return (
    <>
      <Router>
        <GlobalStyle />
        <Header>
          <Routes>
            {/* Render the Search component only on the home page */}
            <Route
              path='/'
              element={
                <>
                  <Search
                    filterFilms={filterFilms}
                    showFaves={showFaves}
                    toggleShowFaves={toggleShowFaves}
                    favefilmIds={favefilmIds.length}
                    FaveouriteFilms={FaveouriteFilms.length}
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
                  title={hasFiltered ? "Search results" : "All Films"}
                />
              )
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/profile' element={<Profile />} />
          {/* <Route path='/profile' element={<Profile films={films} toggleFave={toggleFave} }/> */}
        </Routes>
        <Transition in={showPanel} timeout={300}>
          {(state) => (
            <SidePanel film={selectedFilm} closePanel={closePanel} toggleFave={toggleFave} state={state} user={user} />
          )}
        </Transition>
      </Router>
    </>
  );
}

export default App;
