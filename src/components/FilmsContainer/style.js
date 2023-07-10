import styled from "styled-components";

export const Container = styled.div`
  padding: 140px 40px;
  position: ${({ $isPanelOpen }) => ($isPanelOpen ? "fixed" : "unset")};
  top: ${({ $isPanelOpen, $top }) => ($isPanelOpen ? `-${$top}px` : 0)};

  @media (max-width: 800px) {
    padding: 114px 20px;
  }
`;
export const H2 = styled.h2`
  font-size: 42px;
  margin: 0 0 10px 0;

  @media (max-width: 800px) {
    font-size: 32px;
  }
`;

export const FilmList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 40px;
  grid-row-gap: 80px;
  margin-top: 20px;
  max-width: 1200px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    grid-row-gap: 60px;
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 20px;
  }
`;

export const NoFilmsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 50vh;
`;
