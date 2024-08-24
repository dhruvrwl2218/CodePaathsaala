import React from "react";
import { Link } from "react-router-dom";
import { SiInstagram } from "react-icons/si";
import { BsTelegram } from "react-icons/bs";
import { RiTwitterXLine } from "react-icons/ri";
import { CiLinkedin } from "react-icons/ci";
import { BiLogoDiscordAlt } from "react-icons/bi";
import { FaLongArrowAltRight } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="text-white pt-20 px-3 font-serif border-t border-neutral-800 ">
      
      <div className="flex flex-wrap  justify-between md:mx-80 ">
          <img
            className="w-48 "
           src="Nerd Niche (1).gif"
            alt="logo"
          />
        <div className="text-sm text-indigo-300 md:flex gap-10 md:text-md">
          <ul className="mx-auto">
            <Link to={"/About"}><li className="p-2 ">About us</li></Link>
            <Link to={'/IssuePage'}><li className="p-2">Contact us</li></Link> 
            <li className="p-2">Updates</li>
          </ul>
          <ul className="">
            <Link to={"/Terms&services"}><li className="p-2">Terms of Use</li></Link>
            <Link to={"/PrivacyPolicy"}><li className="p-2">Privacy Policy</li></Link>
            <Link to={"/RefundPolicy"}><li className="p-2">Refund and Cancellation Policy</li></Link>
          </ul>
        </div>
      </div>
      <div className="flex flex-col align-middle mt-10 bg-neutral-900">
        <p className="w-full text-center text-3xl text-indigo-300">
          Let's Chat!
        </p>
        <a className="w-full text-center text-md" href="mailto:codepathsaala@gmail.com">
        codepathsaala@gmail.com
        </a>
        <div className="flex justify-around m-2">
          <SiInstagram className="text-4xl p-1" />
          <BsTelegram className="text-4xl p-1" />
          <BiLogoDiscordAlt className="text-4xl p-1" />
          <RiTwitterXLine className="text-4xl p-1" />
          <CiLinkedin className="text-4xl" />
        </div>
        <div className="w-full text-center p-1 mt-2 text-sm">Copyright © 2024 Sorting Code Pathsaala Pvt Ltd. All Rights Reserved.</div>
      </div>
    </div>
  );
};

export default Footer;