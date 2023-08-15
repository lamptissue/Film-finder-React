import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
    box-sizing: border-box;
    padding:0;
    margin: 0;
  }
  body {
    font-family: 'Poppins', sans-serif;
    background: #F3AFAF;
  }

a {
  text-decoration: none;
  color: black;
}
`;

export const Pill = styled.div`
  background: #daebd4;
  border: 2px solid #000;
  border-radius: 22px;
  height: 25px;
  width: 25px;
  padding: 10px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  display: flex;
`;

export const Close = styled.button`
  background: none;
  border: 0;
  cursor: pointer;
  height: 30px;
  width: 30px;
  padding: 0;
  position: relative;
  &::before,
  &::after {
    background-color: #000;
    content: "";
    height: 20px;
    width: 2px;
    position: absolute;
    top: 5px;
    left: 3px;
  }
  &::before {
    transform: rotate(45deg);
  }
  &::after {
    transform: rotate(-45deg);
  }
`;
export const Button = styled.button`
  display: inline;
  border-radius: 30px;
  padding: 10px;
  border: 2px solid #000;
  background: #f8f9fa;
  font-size: 15px;
  cursor: pointer;
  /* 
  @media (max-width: 1000px) {
    font-size: 14px;
  } */
`;

export const LoadingP = styled.p`
  padding: 140px 60px;

  font-weight: 700;
`;
