import React, { useState } from "react";
import { Link } from "react-router-dom";
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

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    //   axios
    //     .post("https://repulsive-crab-hem.cyclic.app/api/users/login", {
    //       email,
    //       password,
    //     })
    //     .then(function (response) {
    //       console.log(response);
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
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
