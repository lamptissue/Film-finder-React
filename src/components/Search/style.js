import styled from "styled-components";
import { Pill } from "../../styles";

export const SearchContainer = styled(Pill)`
  width: ${({ $showOnDesktop }) => ($showOnDesktop ? "420px" : "20px")};
  transition: 300ms;
  @media (max-width: 800px) {
    width: 85%;
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
    background: yellow;
    border-top: 2px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 64px;
    width: 100vw;
    left: 0;
    bottom: 0;
    position: fixed;
    z-index: 1;
  }
`;

export const FaveButtonContainer = styled.div`
  display: flex;

  @media (max-width: 1000px) {
    position: relative;
    left: -15px;
  }
`;

export const Counter = styled(Pill)`
  position: relative;
  right: -120px;
  bottom: 5px;
  padding: 4px;

  @media (max-width: 1000px) {
    right: -120px;
    padding: 2px;
  }
`;
