import styled from "styled-components";
import { Pill, Button } from "../../styles";

export const SearchContainer = styled(Pill)`
  width: ${({ $showOnDesktop }) => ($showOnDesktop ? "420px" : "35px")};
  height: 35px;
  transition: 300ms;
  @media (max-width: 800px) {
    width: 80%;
    margin: 10px;
  }
  input,
  button {
    display: ${({ $showOnDesktop }) => ($showOnDesktop ? "block" : "none")};

    @media (max-width: 800px) {
      display: block;
    }
  }
`;

export const Input = styled.input`
  font-size: 18px;
  flex-grow: 1;
  background: inherit;
  border: none;
  padding: 6px;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 800px) {
    background: #fddd7f;
    box-shadow: 0 4px 6px #0000001a, 0 1px 3px #0003;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70px;
    width: 100vw;
    left: 0;
    bottom: 0;
    position: fixed;
    z-index: 1;
  }
`;

export const FaveButtonContainer = styled.div`
  display: flex;
  margin-right: 20px;

  @media (max-width: 900px) {
    position: relative;
    left: -5px;
  }
`;

export const Counter = styled(Pill)`
  position: relative;
  right: -110px;
  bottom: 10px;

  @media (max-width: 1000px) {
    right: -100px;
    padding: 2px;
  }
`;

export const SearchClose = styled.button`
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
  }
  &::before {
    transform: rotate(45deg);
  }
  &::after {
    transform: rotate(-45deg);
  }
`;

export const FavouriteButton = styled(Button)`
  @media (max-width: 800px) {
    width: 105px;
  }
`;
