import React from "react";
import Krispy from "../assets/ads/krispykreme.jpg";
import Tacobell from "../assets/ads/tacobell.jpeg";

const Ads = () => {
  return (
    <div className="h-full">
      <div className="flex flex-row justify-center space-x-4">
        <div className="shadow-md shadow-gray-600 rounded-lg flex flex-row">
          <div className="pr-20">
            <div className="rounded-md box-content h-38 right-[9rem] w-[30.5rem] bg-purple-800 relative z-20">
              <div
                className="w-[30rem] h-0 absolute border-l-transparent border-t-[167px] 
              border-purple-800 border-r-[65px] border-r-transparent pl-56 left-40"
              ></div>
              {/* over here */}
            </div>
            <img
              alt=""
              src={Tacobell}
              className="relative left-[23rem] rounded-md h-[10.3rem] w-52"
            />
          </div>
        </div>
        <div className="shadow-md shadow-gray-600 rounded-lg flex flex-row">
          <div className="rounded-md box-content h-38 w-[22.5rem] bg-green-900 relative">
            <div
              className="w-0 h-0 absolute border-l-transparent border-t-[167px]
            border-green-900 border-r-[65px] border-r-transparent pl-56 left-40"
            ></div>
          </div>
          <img
            alt=""
            src={Krispy}
            className="right-2 rounded-md h-[10.3rem] w-52"
          />
        </div>
      </div>
    </div>
  );
};

export default Ads;
