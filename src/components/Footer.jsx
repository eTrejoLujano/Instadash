import React from "react";
import { useLocation } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { BsFillPersonLinesFill, BsCodeSlash } from "react-icons/bs";

const Footer = () => {
  const { pathname } = useLocation();
  if (pathname === "/pickup" || pathname === "/orders/receipt") {
    return null;
  }
  const links = [
    {
      id: 1,
      child: (
        <>
          <FaLinkedin size={30} />
        </>
      ),
      href: "https://www.linkedin.com/in/erik-trejo-lujano/",
      style:
        "rounded-full flex items-center justify-center w-[3.6rem] flex items-center justify-center h-[3.6rem] bg-blue-600",
    },
    {
      id: 2,
      child: (
        <>
          <FaGithub size={30} />
        </>
      ),
      href: "https://github.com/eTrejoLujano",
      style:
        "rounded-full flex items-center justify-center w-[3.6rem] flex items-center justify-center h-[3.6rem] bg-gray-500",
    },
    {
      id: 3,
      child: (
        <>
          <HiOutlineMail size={30} />
        </>
      ),
      href: "mailto:trejolujano.erik@gmail.com",
      style:
        "rounded-full flex items-center justify-center w-[3.6rem] flex items-center justify-center h-[3.6rem] bg-green-600",
    },
    {
      id: 4,
      child: (
        <>
          <BsFillPersonLinesFill size={30} />
        </>
      ),
      href: "/Erik_TrejoLujano_Resume.pdf",
      style:
        "rounded-full flex items-center justify-center w-[3.6rem] flex items-center justify-center h-[3.6rem] bg-blue-400",
      download: true,
    },
  ];
  return (
    <div
      className={`w-screen h-[20rem] md:pt-[0rem] pt-[8rem] relative ${
        pathname === "/store" && "top-[6rem]"
      } ${pathname === "/category" && "top-[2rem]"} ${
        pathname === "/account" && "top-[3rem]"
      } ${pathname === "/orders" || (pathname === "/" && "top-[1rem]")}`}
    >
      <div className="w-full h-[.05rem] rounded bg-gray-200" />
      <div className="flex flex-col items-center w-full h-full">
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div>Dashed Eats</div>
          <div>By</div>
          <div>Erik Trejo</div>
        </div>
        <div className="flex space-x-4 items-center">
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
      </div>
    </div>
  );
};

export default Footer;
