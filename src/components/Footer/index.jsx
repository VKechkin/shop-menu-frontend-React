import React from "react";

import phoneImg from "../../assets/icon/phoneIcon.png";
import addressImg from "../../assets/icon/addressIcon.png";
import instagramImg from "../../assets/icon/instagramIcon.png";

import "./style.scss";

const Footer = () => {
  return (
    <footer>
      <div className="footer-wrapper">
        <img src={addressImg} alt="adress"></img>
        <div>Address: Taganrog, Chekhov str., 262</div>
      </div>
      <div className="footer-wrapper">
        <img src={phoneImg} alt="phone"></img>
        <div>Phone: 8 903 307 01 05</div>
      </div>
      <div className="footer-wrapper">
        <img src={instagramImg} alt="instagram"></img>
        <div>We are in social networks: insta_orchid</div>
      </div>
    </footer>
  );
};

export default Footer;
