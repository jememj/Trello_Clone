import React from "react";
import "./style.scss";
import img from "../../assets/logo.png";

const Header = () => {
  return (
    <header className="header">
      <img className="header__icon" src={img} alt="header-icon" />
      <h2 className="header__title">Trello Clone</h2>
    </header>
  );
};
export default Header;
