import React from "react";
import { FaGithub, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import Wrapper from "../sections/Wrapper";

const About = () => {
  return (
    <div className="about">
      <h3>Hi! My name is Trinh (Kayleigh)</h3>
      <p className="about-text">Following me from links bellow</p>
      <div className="about-link">
        <a href="https://github.com/TrinhHuynh98">
          <FaGithub />
        </a>
        <a href="https://www.instagram.com/kayleighx98/">
          <FaInstagram />
        </a>
        <a href="https://www.linkedin.com/in/trinhhuynh98/">
          <FaLinkedin />
        </a>
      </div>
    </div>
  );
};

export default Wrapper(About);
