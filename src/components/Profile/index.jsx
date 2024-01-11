import React, { useState, useEffect } from "react";
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

function Profile() {
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
        const favouriteFilms = userData.favouriteFilms;

        // Fetch film details using favouriteFilms array
        axios
          .get(`https://repulsive-crab-hem.cyclic.app/api/films`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            const filmsData = response.data.data.films;
            const favouriteFilmTitles = favouriteFilms.map((filmId) => {
              const film = filmsData.find((film) => film._id === filmId);
              return film ? film.Title : "Unknown Title";
            });
            setFavouriteFilmDetails(favouriteFilmTitles);
            setLoading(false); // Set loading to false after fetching data
          })
          .catch((error) => {
            console.error("Error fetching film data:", error);
            setLoading(false); // Set loading to false on error
          });
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false); // Set loading to false on error
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
        // Update the favorite films state after successful deletion
        setFavouriteFilms((prevFilms) => prevFilms.filter((_id) => _id !== filmId));
      })
      .catch((error) => {
        console.error("Error deleting film:", error);
      });
  };

  ///needs checking
  const handleRemoveUser = () => {
    const confirmSignOut = window.confirm("Are you sure you want to delete your profile?");
    if (confirmSignOut) {
      axios
        .delete(`https://repulsive-crab-hem.cyclic.app/api/users/${user.username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // Show the sign-out warning
          localStorage.clear();
          alert("Your profile has been deleted");
          navigate("/");
          console.log(response);
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
                  {filmTitle}{" "}
                  <RemoveButton onClick={() => handleRemoveFilm(favouriteFilms[index])}>Remove</RemoveButton>
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
