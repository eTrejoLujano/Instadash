import React from "react";
import Krispy from "../assets/ads/krispykreme.jpg";
import Tacobell from "../assets/ads/tacobell.jpeg";

const Ads = () => {
  return (
    <div className="h-full">
      <div className="flex flex-row justify-center space-x-[14.5rem] pr-[13.4rem]">
        <div className="rounded-lg flex flex-row">
          <div >
            <div className="rounded-md box-content h-38 w-[22.5rem] bg-purple-800 relative z-20">
              <div
                className="w-0 h-0 relative border-l-transparent border-t-[167px] 
              border-purple-800 border-r-[65px] border-r-transparent pl-56 left-40 z-20"
              ></div>
              {/* over here */}
            </div>
            <img
              alt=""
              src={Tacobell}
              className="relative left-[23rem] top-[-10.41rem] rounded-md h-[10.38rem] w-52"
            />
          </div>
        </div>
        <div className="rounded-lg flex flex-row">
        <div>
          <div className="rounded-md box-content h-38 w-[22.5rem] bg-green-900 relative z-20">
            <div
              className="w-0 h-0 relative border-l-transparent border-t-[167px]
            border-green-900 border-r-[65px] border-r-transparent pl-56 left-40 z-20"
            ></div>
          </div>
          <img
            alt=""
            src={Krispy}
            className="right-[-23rem] top-[-10.4rem] relative rounded-md h-[10.38rem] w-52"
          />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ads;
