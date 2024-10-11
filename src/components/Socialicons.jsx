import React from "react";
import { FaFacebook, FaTwitter, FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const SocialIcons = ({ Icons }) => {
  return (
    <div className="text-teal-500">
      {Icons.map((icon) => (
        <a
          key={icon.name}
          href={icon.link}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 cursor-pointer inline-flex items-center rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-teal-500 duration-300"
        >
          {icon.name === "logo-facebook" && <FaFacebook />}
          {icon.name === "logo-twitter" && <FaTwitter />}
          {icon.name === "logo-github" && <FaGithub />}
          {icon.name === "logo-linkedin" && <FaLinkedin />}
          {icon.name === "logo-instagram" && <FaInstagram />}
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;
