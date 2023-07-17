import React from "react";
import Togos from "../../assets/restaurants/togos.png";
import TogosLogo from "../../../files/logo/Togos_Logo.png";
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
  let dotElement = <div className="text-2xl relative bottom-[.3rem]">·</div>;
  return (
    <div className="lg:pt-[5rem] w-screen sm:px-4">
      <div className="flex flex-col items-center">
        <div className="">
          <img
            src={store.src}
            className="sm:rounded-[20px] object-cover h-[15.7rem] w-[56rem]"
          />

          <div className="bottom-[2.8rem] items-start relative pl-4">
            <img
              src={store.Logo}
              className="h-[5.2rem] rounded-full border-1 border-white bg-white"
            />
          </div>
          <div className="relative bottom-[1.2rem] space-y-3">
            <span className="font-bold text-4xl relative bottom-3 items-start">
              {store.name}
            </span>
            <p className="text-gray-500 text-sm">
              {store.rate} {store.reviews} {store.distance} $?$?
            </p>
            <p className="flex relative">
              open/close??
              {/* {dotElemsent}  */}
              (closing time)
            </p>
            <div className="rounded-xl h-[4rem] w-[9rem] flex justify-center border">
              <div className="flex items-center">
                <div className="flex-col flex items-center">
                  <div className="text-md">Time</div>
                  <div className="text-sm">delivery time</div>
                </div>
              </div>
            </div>
            <div className="w-full h-[.05rem] rounded bg-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreView;
