import styled from "styled-components";
import { Button } from "../../styles";

export const Container = styled.div`
  padding: 140px 40px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const ProfileContainer = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 5px;
  min-width: 50%;
  margin: auto 20px;
  min-height: 480px;
  box-shadow: 0 4px 6px #0000001a, 0 1px 3px #0003;
`;

export const H2 = styled.h2`
  font-size: 42px;
  margin: 0 0 10px 0;

  @media (max-width: 800px) {
    font-size: 32px;
  }
`;

export const ProfileForm = styled.form`
  margin-top: 10px;
`;

export const StyledLabel = styled.label`
  display: block;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
  margin-top: 5px;
  display: block;
`;

export const StyledButton = styled(Button)`
  transition: 0.3s ease-in;
  &:hover {
    background-color: #89cff0;
  }
`;

export const DeleteButton = styled(Button)`
  transition: 0.3s ease-in;
  &:hover {
    background-color: #fc3838;
    color: white;
  }
`;

export const H3 = styled.h3`
  margin: 20px 0;
`;

export const ProfileButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Ul = styled.ul`
  list-style-type: none;
`;

export const Li = styled.li`
  display: flex;
  width: 90%;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
`;

export const RemoveButton = styled(Button)`
  transition: 0.3s ease-in;

  padding: 10px;
  &:hover {
    background-color: #fc3838;
    color: white;
  }
`;
