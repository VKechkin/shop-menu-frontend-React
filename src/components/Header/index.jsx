import React from "react";

import orchidImg from "../../assets/icon/logoIcon.png";

import "./style.scss";

const Header = () => {
  return (
    <header>
      <img src={orchidImg} alt="logo" className="img-logo"></img>
      <h1>Orchid restaurant menu</h1>
    </header>
  );
};

export default Header;
