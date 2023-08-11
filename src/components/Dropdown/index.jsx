import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import user from "../../assets/user.svg";
import { DropdownToggle, OptionButton, DropdownOptions, DropdownContainer } from "./styles";

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleOptionClick = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownToggle onClick={() => setIsOpen(!isOpen)}>
        <img src={user} alt='logo' />
      </DropdownToggle>
      <DropdownOptions isOpen={isOpen}>
        <OptionButton onClick={() => handleOptionClick("/login")}>Login</OptionButton>
        <OptionButton onClick={() => handleOptionClick("/signup")}>Sign Up</OptionButton>
        <OptionButton onClick={() => handleOptionClick("/profile")}>Profile</OptionButton>
      </DropdownOptions>
    </DropdownContainer>
  );
}

export default Dropdown;
