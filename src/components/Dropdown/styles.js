import styled from "styled-components";

export const DropdownToggle = styled.div`
  img {
    width: 40px;
    height: 40px;
  }
  display: flex;
  margin-left: 20px;
`;

export const DropdownContainer = styled.div`
  position: relative;
  cursor: pointer;
`;

export const DropdownOptions = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  width: 100px;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

export const OptionButton = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  text-align: left;
  border: none;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
    border-radius: 5px;
  }
`;
