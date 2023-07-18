import { useState, useEffect, useRef } from "react";
import Togos from "../../assets/restaurants/togos.png";
import TogosLogo from "../../../files/logo/Togos_Logo.png";
import { AiOutlineClockCircle, AiOutlineSearch } from "react-icons/ai";
import { BsFillXCircleFill } from "react-icons/bs";
import { FiArrowLeft } from "react-icons/fi";

import FoodItem from "./FoodItem";

const StoreView = () => {
  let store = {
    id: 2,
    name: "Togo's",
    src: Togos,
    Logo: TogosLogo,
    save: false,
    distance: "1.0 mi",
    time: "20 min",
    fee: "$1.99 Delivery Fee",
    rate: "4.7",
    reviews: "(2,300+)",
  };
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
  let dotElement = <div className="text-2xl relative bottom-[.3rem]">·</div>;
  return (
    <div className="lg:pt-[5rem] w-screen sm:px-4">
      <div className="flex flex-col items-center">
        <div className="">
          <img
            src={store.src}
            className="sm:rounded-[20px] object-cover h-[15.7rem] w-[56rem]"
          />
          <div className="relative bottom-6 sm:bottom-0">
            <div className="bottom-[2.8rem] items-start relative pl-4">
              <img
                src={store.Logo}
                className="h-[5.2rem] rounded-full border-1 border-white bg-white shadow-lg shadow-gray-400"
              />
            </div>
            <div className="px-4 sm:px-0 relative bottom-1">
              <div className="flex justify-between bottom-[1.8rem] relative">
                <div className=" space-y-3">
                  <span className="font-bold text-4xl relative  items-start">
                    {store.name}
                  </span>
                  <p className="text-gray-500 text-sm flex">
                    {store.rate} {store.reviews} {store.distance} $?$?
                  </p>
                  <p className="flex relative">
                    <AiOutlineClockCircle
                      className="relative top-[.4rem] text-gray-500"
                      size={13}
                    />
                    Open/close??
                    {/* {dotElemsent}  */}
                    (closing time)
                  </p>
                </div>
                <div className="flex sm:flex-row flex-col items-center space-y-2 sm:space-x-2 bottom-[.8rem] relative">
                  <div className="rounded-xl h-[4rem] w-[9rem] flex justify-center border">
                    <div className="flex items-center">
                      <div className="flex-col flex items-center">
                        <div className="text-md">Time</div>
                        <div className="text-sm">delivery time</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex sm:flex-row flex-col items-center">
                    <div className="rounded-full w-[10rem] h-[3rem] border-2" />
                  </div>
                </div>
              </div>
              <div className="w-full h-[.05rem] rounded bg-gray-200" />
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:justify-between items-center space-y-4">
                  <div className="">Full Menu</div>
                  {/* <div className="flex justify-center items-center w-full px-4"> */}
                  <div className="relative md:w-[20rem] w-full bottom-2">
                    <div className="absolute text-gray-500 top-2 left-2">
                      <AiOutlineSearch size={24} />
                    </div>
                    {!searchIcon && (
                      <button className="absolute text-gray-500 top-[.6rem] left-[17.6rem]">
                        <BsFillXCircleFill size={21} onClick={onClear} />
                      </button>
                    )}
                    <input
                      type="text"
                      className="rounded-full block py-2 px-10 text-sm w-full h-[2.6rem] border border-gray-100 bg-gray-100 focus:ring-black text-black"
                      ref={ref}
                      placeholder="Search store menu"
                      onClick={() => setSearchIcon(false)}
                    />
                    {/* </div> */}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 gap-1 px-4 md:px-0">
                  <FoodItem />
                  <FoodItem />
                  <FoodItem />
                  <FoodItem />
                  <FoodItem />
                  <FoodItem />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreView;
