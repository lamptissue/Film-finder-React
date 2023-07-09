import styled from "styled-components";

export const HeaderContainer = styled.header`
  background-color: yellowgreen;
  padding: 20px 40px;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  display: flex;
  position: fixed;
  top: 0;
  z-index: 3;

  @media (max-width: 800px) {
    padding: 20px;
  }
`;
