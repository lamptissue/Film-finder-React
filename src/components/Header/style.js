import styled from "styled-components";

export const HeaderContainer = styled.header`
  /* background: #a7e1f8; */
  background: #fddd7f;
  padding: 20px 40px;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  display: flex;
  position: fixed;
  top: 0;
  z-index: 3;
  box-shadow: 0 4px 6px #0000001a, 0 1px 3px #0003;

  @media (max-width: 800px) {
    padding: 20px;
  }
`;

export const HeaderChildrenContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
