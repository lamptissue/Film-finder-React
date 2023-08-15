import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  H2,
  LoginContainer,
  Form,
  StyledInput,
  StyledLabel,
  StyledButton,
  StyledLink,
  H3,
  P,
} from "./style";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://repulsive-crab-hem.cyclic.app/api/users/login", {
        email,
        password,
      })
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
      });
  };

  return (
    <Container>
      <LoginContainer>
        <H2>Login</H2>
        <Form onSubmit={handleLoginSubmit}>
          <StyledLabel for='email'>Email: *</StyledLabel>
          <StyledInput
            type='email'
            placeholder='Email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <StyledLabel for='password'>Password: *</StyledLabel>

          <StyledInput
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <StyledButton type='submit'>Login</StyledButton>
        </Form>
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
