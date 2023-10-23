import React from "react";
import { useLocation } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";
import Instacart from "/assets/icons/instadash.png";
import picture from "/personalphoto.jpeg";

const Footer = () => {
  const { pathname } = useLocation();
  if (pathname === "/pickup" || pathname === "/orders/receipt") {
    return null;
  }
  const links = [
    {
      id: 1,
      child: (
        <div className="group text-red-200">
          <div className="group-hover:text-teal-500">
            <CgWebsite className="" size={30} />
          </div>
          <div className="hidden group-hover:text-teal-500 group-hover:flex w-full h-full relative top-2 items-center justify-center">
            <div className="absolute">Portfolio</div>
          </div>
        </div>
      ),
      href: "https://eriktrejolujano.netlify.app/",
      style:
        "rounded-full flex items-center justify-center w-[3.6rem] flex items-center justify-center h-[3.6rem]",
    },
    {
      id: 1,
      child: (
        <div className="group text-red-200">
          <div className="group-hover:text-blue-600">
            <FaLinkedin size={30} />
          </div>
          <div className="hidden group-hover:text-blue-600 group-hover:flex w-full h-full relative top-2 items-center justify-center">
            <div className="absolute">LinkedIn</div>
          </div>
        </div>
      ),
      href: "https://www.linkedin.com/in/erik-trejo-lujano/",
      style:
        "rounded-full flex items-center justify-center w-[3.6rem] flex items-center justify-center h-[3.6rem]",
    },
    {
      id: 2,
      child: (
        <div className="group text-red-200">
          <div className="group-hover:text-gray-500">
            <FaGithub size={30} />
          </div>
          <div className="hidden group-hover:text-gray-500 group-hover:flex w-full h-full relative top-2 items-center justify-center">
            <div className="absolute">GitHub</div>
          </div>
        </div>
      ),
      href: "https://github.com/eTrejoLujano",
      style:
        "rounded-full flex items-center justify-center w-[3.6rem] flex items-center justify-center h-[3.6rem]",
    },
    {
      id: 3,
      child: (
        <div className="group text-red-200">
          <div className="group-hover:text-green-600">
            <HiOutlineMail size={30} />
          </div>
          <div className="hidden group-hover:text-green-600 group-hover:flex w-full h-full relative top-2 items-center justify-center">
            <div className="absolute">Email</div>
          </div>
        </div>
      ),
      href: "mailto:trejolujano.erik@gmail.com",
      style:
        "rounded-full flex items-center justify-center w-[3.6rem] flex items-center justify-center h-[3.6rem]",
    },
    {
      id: 4,
      child: (
        <div className="group text-red-200">
          <div className="group-hover:text-blue-400">
            <BsFillPersonLinesFill size={30} />
          </div>
          <div className="hidden group-hover:text-blue-400 group-hover:flex w-full h-full relative top-2 items-center justify-center">
            <div className="absolute">Resume</div>
          </div>
        </div>
      ),
      href: "/Erik_TrejoLujano_Resume.pdf",
      style:
        "rounded-full flex items-center justify-center w-[3.6rem] flex items-center justify-center h-[3.6rem]",
      download: true,
    },
  ];
  return (
    <div
      className={`w-screen h-full md:pt-[0rem] pt-[8rem] pb-2
      relative ${pathname === "/store" && "top-[6rem]"} ${
        pathname === "/category" && "top-[2rem]"
      } ${pathname === "/account" && "top-[3rem]"} ${
        pathname === "/orders" || (pathname === "/" && "top-[1rem]")
      } ${
        pathname === "/account/change-password" &&
        "md:bottom-[1rem] bottom-[8.95rem]"
      }`}
    >
      <div className="w-full h-[.05rem] rounded bg-gray-200 relative top-4" />
      <div className="flex flex-col items-center w-full h-full relative pt-6 space-y-3">
        <div className="flex space-x-[1.3rem] sm:space-x-[2rem] items-center">
          {links.map(({ id, child, href, style, download }) => (
            <li
              key={id}
              className={"flex items-center h-14 px-4" + " " + style}
            >
              <a
                href={href}
                className="flex items-center text-white"
                download={download}
                target="_blank"
                rel="noreferrer"
              >
                {child}
              </a>
            </li>
          ))}
        </div>
        <div className="flex items-center justify-center w-full md:w-[50rem] h-full">
          <div className="flex items-center space-x-2">
            <img src={Instacart} className="w-[2.5rem] h-[2.5rem]" />
            <div className="text-xl font-bold text-red-500 flex">
              DASHED EATS
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-full flex justify-center text-red-600">
                by Erik Trejo
              </div>
              <img
                src={picture}
                className="w-[3.5rem] h-[3.5rem] rounded-full"
              />
            </div>
          </div>
          {/* <div className="flex space-x-2">
            <div className="">Email</div>
            <div className="">Resume</div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Footer;
