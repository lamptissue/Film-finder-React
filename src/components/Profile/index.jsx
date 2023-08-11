import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, ProfileContainer } from "./style";

function Profile() {
  const [favouriteFilms, setFilms] = useState([]);

  useEffect(() => {
    axios
      .get(`https://repulsive-crab-hem.cyclic.app/api/films`)
      .then((response) => {
        const filmsData = response.data.data.films;
        setFilms(filmsData);
      })
      .catch((error) => {
        console.error("Error fetching films:", error);
      });
  }, []);

  return (
    <Container>
      <ProfileContainer>
        <h1>im the profile mate</h1>;<p>Want to update your profile?</p>
        <form>
          <input type='text' placeholder='name' />
          <input type='text' placeholder='password' />
          <input type='text' placeholder='email' />
        </form>
        <p>Here are your faveourite films bro</p>
        <ul>
          {favouriteFilms.map((film) => (
            <li key={film._id}>{film.Title}</li>
          ))}
        </ul>
      </ProfileContainer>
    </Container>
  );
}

export default Profile;
