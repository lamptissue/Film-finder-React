import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  H2,
  SignupContainer,
  SignUpForm,
  StyledInput,
  StyledLabel,
  StyledButton,
  StyledLink,
  H3,
  P,
} from "./style";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required().trim(),
  username: Yup.string().required().trim(),
  email: Yup.string().email("Invalid email address").required(),
  password: Yup.string().min(6, "must be at least 6 characters long").required(),
  passwordConfirm: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
});

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [birthday, setBirthday] = useState("");
  const navigate = useNavigate();
  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    // Check if passwords match
  };

  return (
    <Container>
      <SignupContainer>
        <H2>Sign Up</H2>
        <Formik
          initialValues={{
            name: "",
            username: "",
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
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
                localStorage.setItem("token", response.data.token);
                const user = response.data.data.user;
                localStorage.setItem("user", JSON.stringify(user));
                navigate("/");
                alert("You're all signed up! Enjoy!");

                // Handle success, maybe redirect the user or show a success message
              })
              .catch((error) => {
                console.error("Error signing up user:", error);
                // Handle error, show an error message
              });
          }}
        >
          <Form>
            <StyledLabel htmlFor='name'>Name:</StyledLabel>
            <Field type='text' placeholder='name' name='name' as={StyledInput} />
            <ErrorMessage name='name' component='div' />

            <StyledLabel htmlFor='username'>Username:</StyledLabel>
            <Field type='text' placeholder='username' name='username' as={StyledInput} />
            <ErrorMessage name='username' component='div' />

            <StyledLabel htmlFor='email'>Email:</StyledLabel>
            <Field type='text' placeholder='email' name='email' as={StyledInput} />
            <ErrorMessage name='email' component='div' />

            <StyledLabel htmlFor='birthday'>Date of Birth:</StyledLabel>
            <Field type='date' placeholder='date of birth' name='birthday' as={StyledInput} />
            <ErrorMessage name='birthday' component='div' />

            <StyledLabel htmlFor='password'>Password:</StyledLabel>
            <Field type='password' placeholder='password' name='password' as={StyledInput} />
            <ErrorMessage name='password' component='div' />

            <StyledLabel htmlFor='passwordConfirm'>Password Confirm:</StyledLabel>
            <Field type='password' placeholder='password Confirm' name='passwordConfirm' as={StyledInput} />
            <ErrorMessage name='passwordConfirm' component='div' />

            <StyledButton type='submit'>Sign Up!</StyledButton>
          </Form>
        </Formik>

        {/* <SignUpForm onSubmit={handleSignUpSubmit}>
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
        </SignUpForm> */}
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
