import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/Ai";
import { FiArrowLeft } from "react-icons/Fi";
import { IoMdCart } from "react-icons/Io";
import DoorDash from "../../public/doordashlogo.png";

function Navbar() {
  const [nav, setNav] = useState(false);
  const [searchIcon, setSearchIcon] = useState(true);
  const ref = useRef(null);
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setSearchIcon(true);
    }
  };
  const onClear = () => {
    ref.current.value = "";
    setSearchIcon(true);
  };
  return (
    <div
      className="flex justify-between items-center w-full h-[4rem] px-20
     text-black bg-white fixed border-solid border border-gray-200 z-50"
    >
      <FaBars
        className="cursor-pointer h-5 left-[6.5rem] top-[1.6rem] absolute"
        size={22}
      />
      <button className="cursor-pointer">
        <img
          src={DoorDash}
          className="w-[9.9rem] h-30 left-[9rem] bottom-[-1.5rem] top-[-.6rem] absolute"
        />
      </button>
      <ul className="hidden md:flex left-80 top-6 absolute">
        <li className="px-4 cursor-pointer capitalize font-medium text-black hover:scale-105 duration-200">
          <div>delivery</div>
        </li>
        <li className="px-4 cursor-pointer capitalize font-medium text-black hover:scale-105 duration-200">
          <div>pickup</div>
        </li>
        <li className="absolute left-44 bottom-8">
          <h3 className="text-3xl absolute font-light text-gray-300">|</h3>
        </li>
        <li className="absolute left-52 bottom-6">
          <h3 className="4xl absolute text-black truncate">Enter Address</h3>
        </li>
      </ul>
      <div className="absolute top-[0.5rem] right-[13rem] w-[28rem]">
        {searchIcon ? (
          <div className="absolute text-gray-500 top-2 left-2">
            <AiOutlineSearch size={24} />
          </div>
        ) : (
          <button className="absolute text-gray-500 top-[.6rem] left-2">
            <FiArrowLeft size={23} onClick={onClear} />
          </button>
        )}

        <input
          type="text"
          className="rounded-lg block py-2 px-10 text-sm w-full h-[2.6rem] border border-gray-100 bg-gray-100 focus:ring-black text-black"
          ref={ref}
          placeholder="Search stores, dishes, products"
          onClick={() => setSearchIcon(false)}
        />
      </div>
      <div className="cursor-pointer group">
        <button className="rounded-full  absolute top-[.6rem] right-[7.4rem] border-2 w-[4.6rem] h-[2.3rem] text-white border-gray-100 bg-red-500 group-hover:bg-red-600" />
        <div className="absolute right-[9.5rem] top-[1rem] text-white">
          <IoMdCart size={27} />
        </div>
        <h2 className="text-white top-[1rem] right-[8.3rem] absolute">0</h2>
      </div>
    </div>
  );
}

export default Navbar;
