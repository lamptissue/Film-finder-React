import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, H2, SignupContainer, StyledInput, StyledLabel, StyledButton, StyledLink, H3, P } from "./style";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../../styles.css";

const validationSchema = Yup.object({
  name: Yup.string().required().trim(),
  username: Yup.string().required().trim(),
  email: Yup.string().email("Invalid email address").required(),
  password: Yup.string().min(8, "must be at least 8 characters long").required(),
  passwordConfirm: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
});

function SignUp() {
  const navigate = useNavigate();

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
            passwordConfirm: "",
            birthday: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            axios
              .post("https://repulsive-crab-hem.cyclic.app/api/users/signup", values)
              .then((response) => {
                console.log(response);
                localStorage.setItem("token", response.data.token);
                const user = response.data.data.user;
                localStorage.setItem("user", JSON.stringify(user));
                navigate("/");
                alert("You're all signed up! Enjoy!");
              })
              .catch((error) => {
                console.error("Error signing up user:", error);
                alert("There was a problem creating your account, please try again");
              })
              .finally(() => {
                setSubmitting(false);
              });
          }}
        >
          <Form>
            <StyledLabel htmlFor='name'>Name:</StyledLabel>
            <ErrorMessage name='name' component='div' className='styledError' />
            <Field type='text' placeholder='name' name='name' as={StyledInput} />

            <StyledLabel htmlFor='username'>Username:</StyledLabel>
            <ErrorMessage name='username' component='div' className='styledError' />
            <Field type='text' placeholder='username' name='username' as={StyledInput} />

            <StyledLabel htmlFor='email'>Email:</StyledLabel>
            <ErrorMessage name='email' component='div' className='styledError' />
            <Field type='text' placeholder='email' name='email' as={StyledInput} />

            <StyledLabel htmlFor='birthday'>Date of Birth:</StyledLabel>
            <ErrorMessage name='birthday' component='div' className='styledError' />
            <Field type='date' placeholder='birthday' name='birthday' as={StyledInput} />

            <StyledLabel htmlFor='password'>Password:</StyledLabel>
            <ErrorMessage name='password' component='div' className='styledError' />
            <Field type='password' placeholder='password' name='password' as={StyledInput} />

            <StyledLabel htmlFor='passwordConfirm'>Password Confirm:</StyledLabel>
            <ErrorMessage name='passwordConfirm' component='div' className='styledError' />
            <Field type='password' placeholder='password Confirm' name='passwordConfirm' as={StyledInput} />

            <StyledButton type='submit'>Sign Up!</StyledButton>
          </Form>
        </Formik>
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
