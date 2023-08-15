import styled from "styled-components";
import { Button } from "../../styles";

export const Container = styled.div`
  padding: 140px 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const H2 = styled.h2`
  font-size: 42px;
  margin: 0 0 10px 0;

  @media (max-width: 800px) {
    font-size: 32px;
  }
`;

export const SignupContainer = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0 4px 6px #0000001a, 0 1px 3px #0003;
  max-width: 650px;
`;

export const SignUpForm = styled.form`
  height: auto;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
  margin-top: 5px;
`;

// export const StyledButton = styled.button;

export const StyledLabel = styled.label`
  width: 20%;
`;

export const StyledButton = styled(Button)`
  transition: 0.3s ease-in;
  &:hover {
    background-color: #89cff0;
  }
`;
export const StyledLink = styled.a`
  font-weight: bold;
  &:hover {
    text-decoration-line: underline;
  }
`;

export const H3 = styled.h3`
  margin-top: 20px;
`;

export const P = styled.p`
  margin-top: 10px;
`;
