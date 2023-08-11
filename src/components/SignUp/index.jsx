import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Container,
  H2,
  SignupContainer,
  Form,
  StyledInput,
  StyledLabel,
  StyledButton,
  StyledLink,
  H3,
  P,
} from "./style";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    // Check if passwords match
    if (password !== passwordConfirm) {
      console.error("Passwords do not match");
      return; // Do not proceed with signup
    }

    axios
      .post("https://repulsive-crab-hem.cyclic.app/api/users/signup", {
        name,
        username,
        birthday,
        email,
        password,
        passwordConfirm,
      })
      .then((response) => {
        console.log(response);
        // Handle success, maybe redirect the user or show a success message
      })
      .catch((error) => {
        console.error("Error signing up user:", error);
        // Handle error, show an error message
      });
  };

  return (
    <Container>
      <SignupContainer>
        <H2>Sign Up</H2>
        <Form onSubmit={handleSignUpSubmit}>
          <StyledLabel for='name'>Name:</StyledLabel>
          <StyledInput type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />

          <StyledLabel for='username'>Username:</StyledLabel>
          <StyledInput
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <StyledLabel for='email'>Email:</StyledLabel>
          <StyledInput type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />

          <StyledLabel for='birthday'>Date of birth:</StyledLabel>
          <StyledInput
            type='date'
            placeholder='Date of birth'
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />

          <StyledLabel for='password'>Password:</StyledLabel>
          <StyledInput
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <StyledLabel for='passwordConfirm'>Password confirm:</StyledLabel>
          <StyledInput
            type='password'
            placeholder='Password confirm'
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />

          <StyledButton type='submit'>Sign Up!</StyledButton>
        </Form>
        <H3>Already signed up?</H3>
        <P>
          Click&nbsp;
          <Link to='/login'>
            <StyledLink>here</StyledLink>
          </Link>
          &nbsp;to login!
        </P>
      </SignupContainer>
    </Container>
  );
}

export default SignUp;
