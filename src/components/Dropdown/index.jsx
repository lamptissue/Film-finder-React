import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

  const handleSignOut = () => {
    const confirmSignOut = window.confirm("Are you sure you want to Sign Out?");
    // Show the sign-out warning
    if (confirmSignOut) {
      localStorage.clear();
      setIsOpen(false);
      navigate("/");
    }
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

  const isAuth = () => {
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };
  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownToggle onClick={() => setIsOpen(!isOpen)}>
        <img src={user} alt='logo' />
      </DropdownToggle>
      <DropdownOptions isOpen={isOpen}>
        {!isAuth() && <OptionButton onClick={() => handleOptionClick("/login")}>Login</OptionButton>}
        {!isAuth() && <OptionButton onClick={() => handleOptionClick("/signup")}>Sign Up</OptionButton>}
        {isAuth() && <OptionButton onClick={() => handleOptionClick("/profile")}>Profile</OptionButton>}
        {isAuth() && <OptionButton onClick={handleSignOut}>Sign Out</OptionButton>}
      </DropdownOptions>
    </DropdownContainer>
  );
}

export default Dropdown;
