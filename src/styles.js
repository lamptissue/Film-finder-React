import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
    box-sizing: border-box;
    padding:0;
    margin: 0;
  }
  body {
    font-family: 'Poppins', sans-serif;
  }

a {
  text-decoration: none;
  color: black;
}
`;

export const Pill = styled.div`
  background: #a7e1f8;
  border: 2px solid #000;
  border-radius: 30px;
  height: 20px;
  width: 20px;
  padding: 8px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  display: flex;
`;

export const Close = styled.button`
  background: none;
  border: 0;
  cursor: pointer;
  height: 24px;
  width: 24px;
  padding: 0;
  position: relative;
  &::before,
  &::after {
    background-color: #000;
    content: "";
    height: 24px;
    width: 2px;
    position: absolute;
    top: 0;
    left: 9px;
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
  background: transparent;
  font-size: 18px;
  cursor: pointer;

  @media (max-width: 1000px) {
    font-size: 14px;
  }
`;
