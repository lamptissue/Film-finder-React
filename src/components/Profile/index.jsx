import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  ProfileContainer,
  H2,
  H3,
  StyledInput,
  StyledLabel,
  StyledButton,
  ProfileButtonContainer,
  DeleteButton,
  Ul,
  Li,
  RemoveButton,
  LoadingP,
} from "./style";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../../styles.css";

const validationSchema = Yup.object({
  name: Yup.string().required(),
  password: Yup.string().min(6, "must be at least 6 characters long").required(),
  email: Yup.string().email("Invalid email address").required(),
});

function Profile({ films }) {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [favouriteFilmDetails, setFavouriteFilmDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://repulsive-crab-hem.cyclic.app/api/users/${user.username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const userData = response.data.data.user;

        const userFavouriteFilms = userData.favouriteFilms;

        const displayUserFavouriteFilms = userFavouriteFilms.map((filmId) => {
          const film = films.find((film) => film._id === filmId);
          return film ? { title: film.Title, id: film._id } : "Unknown Title";
        });
        setFavouriteFilmDetails(displayUserFavouriteFilms);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, [user.username, token]);

  const handleRemoveFilm = (filmId) => {
    axios
      .delete(`https://repulsive-crab-hem.cyclic.app/api/users/${user.username}/films/${filmId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        setFavouriteFilmDetails((prevFilms) => prevFilms.filter((film) => film.id !== filmId));
      })
      .catch((error) => {
        console.error("Error deleting film:", error);
      });
  };

  const handleRemoveUser = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your profile?");
    if (confirmDelete) {
      axios
        .delete(`https://repulsive-crab-hem.cyclic.app/api/users/${user.username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          alert("Your profile has been deleted");
          navigate("/");
          localStorage.clear();
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  };

  return (
    <Container>
      <ProfileContainer>
        <H2>{user.username}</H2>
        <H3>Want to update your profile?</H3>
        <Formik
          initialValues={{
            name: "",
            password: "",
            email: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            axios
              .patch(`https://repulsive-crab-hem.cyclic.app/api/users/${user.username}`, values, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((response) => {
                window.confirm("Details have been updated!");
                resetForm();
              })
              .catch((error) => {
                console.error("Error updating user data:", error);
                // Handle error, show an error message
              })
              .finally(() => {
                setSubmitting(false);
              });
          }}
        >
          <Form>
            <StyledLabel htmlFor='name'>Update name:</StyledLabel>
            <ErrorMessage name='name' component='div' className='styledError' />
            <Field type='text' placeholder='name' name='name' as={StyledInput} />

            <StyledLabel htmlFor='password'>Update password:</StyledLabel>
            <ErrorMessage name='password' component='div' className='styledError' />
            <Field type='password' placeholder='password' name='password' as={StyledInput} />

            <StyledLabel htmlFor='email'>Update email:</StyledLabel>
            <ErrorMessage name='email' component='div' className='styledError' />
            <Field type='text' placeholder='email' name='email' as={StyledInput} />

            <ProfileButtonContainer>
              <StyledButton type='submit'>Update Profile</StyledButton>
              <DeleteButton onClick={handleRemoveUser}>Delete Profile</DeleteButton>
            </ProfileButtonContainer>
          </Form>
        </Formik>
      </ProfileContainer>
      <ProfileContainer>
        <H2>Favourite Films</H2>

        {loading ? (
          <LoadingP>Loading your favorite films...</LoadingP>
        ) : (
          <Ul>
            {favouriteFilmDetails.length > 0 ? (
              favouriteFilmDetails.map((filmTitle, index) => (
                <Li key={index}>
                  {filmTitle.title}
                  <RemoveButton onClick={() => handleRemoveFilm(filmTitle.id)}>Remove</RemoveButton>
                </Li>
              ))
            ) : (
              <H3>No films have been saved :(</H3>
            )}
          </Ul>
        )}
      </ProfileContainer>
    </Container>
  );
}

export default Profile;
