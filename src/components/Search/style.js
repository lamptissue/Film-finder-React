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
