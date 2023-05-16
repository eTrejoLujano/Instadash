import { useState, useEffect, useRef } from "react";
import { AiOutlineSearch, AiOutlineMenu } from "react-icons/ai";
import { FiArrowLeft } from "react-icons/fi";
import { IoMdCart } from "react-icons/io";
import Instacart from "../../public/instadash.png";

function Navbar() {
  // const [nav, setNav] = useState(false);
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
      className="w-screen h-[4rem] overflow-auto xl:px-20
     text-black bg-white fixed border-solid border border-gray-200 z-50"
    >
      <div className="flex justify-between pt-2">
        <div className="flex justify-center items-center">
          <AiOutlineMenu
            className="cursor-pointer h-5 left-[6.5rem]"
            size={22}
          />
          <div className="cursor-pointer flex items-center pl-6">
            <img src={Instacart} className="w-[2.5rem] h-[2.5rem] top-2" />
            <div className="text-xl font-bold text-red-500 hidden md:flex">
              INSTADASH
            </div>
          </div>
          <ul className="hidden lg:flex items-center left-80">
            <li className="px-4 cursor-pointer capitalize font-medium text-black hover:scale-105 duration-200">
              <div>delivery</div>
            </li>
            <li className="px-4 cursor-pointer capitalize font-medium text-black hover:scale-105 duration-200">
              <div>pickup</div>
            </li>
            <li className="left-44 hidden md:flex">
              <h3 className="text-3xl font-light text-gray-300">|</h3>
            </li>
            <li className="pl-2 bottom-6 hidden xl:flex">
              <h3 className="text-black truncate">Enter Address</h3>
            </li>
          </ul>
        </div>
        <div className="flex justify-center items-center">
          <div className="relative right-[8rem] w-[24rem]">
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
      </div>
    </div>
  );
}

export default Navbar;
