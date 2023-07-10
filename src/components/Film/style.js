import styled from "styled-components";
export const Container = styled.figure`
  cursor: ${({ $isLarge }) => ($isLarge ? "default" : "pointer")};
  margin: 0;
`;

export const Cover = styled.img`
  border-radius: 5px;
  object-fit: cover;
  aspect-ratio: 2/3;
  width: 100%;
  margin-bottom: 16px;
  box-shadow: 0 4px 6px #0000001a, 0 1px 3px #0003;
`;

export const FilmTitle = styled.h3`
  font-size: ${({ $isLarge }) => ($isLarge ? "42px" : "25px")};
  margin: 0 0 10px 0;
  line-height: 1.3;

  @media (max-width: 800px) {
    font-size: ${({ $isLarge }) => ($isLarge ? "32px" : "22px")};
  }
`;

export const Director = styled.h4`
  font-size: 16px;
  line-height: 1.6;
  margin: 0;
  font-weight: 600;
`;
