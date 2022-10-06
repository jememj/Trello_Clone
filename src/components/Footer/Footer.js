import React from "react";
import "./style.scss";
import gh from "../../assets/github.png";
import cat from "../../assets/cat.png";

const Footer = () => {
  return (
    <footer className="footer footer__сontainer">
      <div className="footer contacts">
        <a target="_blank" href="https://github.com/jememj" rel="noreferrer">
          <img className="contacts__logo" src={gh} alt="github" />
        </a>
        <a target="_blank" href="https://inlnk.ru/dn6K6n" rel="noreferrer">
          <img className="contacts__logo" src={cat} alt="cat" />
        </a>
      </div>
    </footer>
  );
};
export default Footer;
