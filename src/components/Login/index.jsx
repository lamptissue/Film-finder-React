import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, H2, LoginContainer, StyledInput, StyledLabel, StyledButton, StyledLink, H3, P } from "./style";
import "../../styles.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required(),
  password: Yup.string().min(8, "Password must be at least 8 characters long").required(),
});

function LoginPage() {
  const navigate = useNavigate();

  return (
    <Container>
      <LoginContainer>
        <H2>Login</H2>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            axios
              .post("https://repulsive-crab-hem.cyclic.app/api/users/login", values)
              .then((response) => {
                console.log("API Response:", response.data); // Log the response for debugging

                const token = response.data.token;
                const user = response.data.data.user;
                if (user) {
                  localStorage.setItem("user", JSON.stringify(user));
                  localStorage.setItem("token", token);
                  navigate("/");
                  alert("Welcome back!");
                } else {
                  console.error("User data is undefined in the response.");
                }
              })
              .catch((error) => {
                console.error("Error logging in:", error);
                alert("Email or password incorrect, please try again");
              })
              .finally(() => {
                setSubmitting(false);
              });
          }}
        >
          <Form>
            <StyledLabel htmlFor='email'>Email:</StyledLabel>
            <ErrorMessage name='email' component='div' className='styledError' />
            <Field type='text' placeholder='email' name='email' as={StyledInput} />

            <StyledLabel htmlFor='password'>Password:</StyledLabel>
            <ErrorMessage name='password' component='p' className='styledError' />
            <Field type='password' placeholder='password' name='password' as={StyledInput} />

            <StyledButton type='submit'>Login</StyledButton>
          </Form>
        </Formik>
        <H3>New here?</H3>
        <P>
          Why not&nbsp;
          <Link to='/signup'>
            <StyledLink>sign up</StyledLink>
          </Link>
          &nbsp;for exclusive features!
        </P>
      </LoginContainer>
    </Container>
  );
}

export default LoginPage;
