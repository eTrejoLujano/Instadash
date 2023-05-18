import { useState, useEffect, useRef } from "react";
import { AiOutlineSearch, AiOutlineMenu } from "react-icons/ai";
import { FiArrowLeft, FiHelpCircle } from "react-icons/fi";
import { IoMdCart } from "react-icons/io";
import { CgClose, CgProfile, CgCloseO } from "react-icons/cg";
import { RxHome } from "react-icons/rx";
import { SlBag } from "react-icons/sl";
import { TfiReceipt } from "react-icons/tfi";
import { TbHeart } from "react-icons/tb";
import { MdPayments } from "react-icons/md";
import Instacart from "../assets/icons/instadash.png";

function Navbar() {
  const [menu, setMenu] = useState(false);
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
    <div>
      <div className="flex">
        <div
          className={`fixed bg-white h-screen z-50 shadow-gray-300 shadow  ${
            menu ? "md:w-[22rem] w-screen" : "md:w-0"
          } duration-300`}
        >
          {menu && (
            <div>
              <div className="relative top-[1.5rem] left-[1rem] cursor-pointer">
                <CgClose size={22} onClick={() => setMenu(!menu)} />
              </div>
              <div className="relative top-[4.5rem] space-y-[2rem]">
                <RxHome size={22} />
                <SlBag size={22} />
                <TfiReceipt size={22} />
                <CgProfile size={22} />
                <TbHeart size={22} />
                <MdPayments size={22} />
                <FiHelpCircle size={22} />
                <CgCloseO size={22} />
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        className="w-screen h-[4rem] xl:px-20
     text-black bg-white fixed border-solid border border-gray-200 z-40"
      >
        <div className="flex justify-between pt-2">
          <div className="flex justify-center items-center relative left-[1rem] space-x-5">
            <AiOutlineMenu
              className="cursor-pointer h-5 left-[6.5rem]"
              size={22}
              onClick={() => setMenu(!menu)}
            />
            <div className="cursor-pointer flex items-center space-x-3">
              <img src={Instacart} className="w-[2.5rem] h-[2.5rem] top-2" />
              <div className="text-xl font-bold text-red-500 hidden lg:flex">
                INSTADASH
              </div>
            </div>
            <ul className="items-center left-80 flex space-x-[.8rem]">
              <li className="cursor-pointer hidden md:flex capitalize font-medium text-black hover:scale-105 duration-200">
                <div>delivery</div>
              </li>
              <li className="cursor-pointer capitalize hidden md:flex font-medium text-black hover:scale-105 duration-200">
                <div>pickup</div>
              </li>
              <li className="left-44 hidden lg:flex">
                <h3 className="text-3xl font-light text-gray-300">|</h3>
              </li>
              <li className="bottom-6 hidden lg:flex">
                <h3 className="text-black truncate">Enter Address</h3>
              </li>
            </ul>
          </div>
          <div className="flex justify-center items-center">
            <div className="relative left-4 lg:w-[24rem] md:w-[26rem] sm:w-[26rem] w-[10.9rem]">
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
            <div className="cursor-pointer group relative">
              <div className="flex relative left-[1.5rem]">
                <button className="rounded-full top-[.6rem] right-[7.4rem] border-2 w-[4.6rem] h-[2.3rem] text-white border-gray-100 bg-red-500 group-hover:bg-red-600" />
                <div className="right-[4rem] relative top-[0.3rem] text-white">
                  <IoMdCart size={27} />
                </div>
                <h2 className="text-white top-[0.2rem] right-[3.3rem] text-lg relative">
                  0
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="w-screen relative h-[7rem] pt-[4rem] justify-center
     text-black bg-white border-solid border border-gray-200 z-30 flex lg:hidden"
      >
        <div className="flex justify-center pt-2">
          <div className="cursor-pointer justify-center flex capitalize font-medium text-black hover:scale-105 duration-200">
            <div className="">Address</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
