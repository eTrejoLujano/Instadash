import React from "react";
import Instadash from "../../assets/icons/instadash.png";

const AuthBar = () => {
  return (
    <div className="fixed h-[3rem] bg-white z-50 w-full border border-solid border-gray-300 ">
      <div className="flex flex-col items-center justify-center">
        <div className="cursor-pointer flex items-center space-x-3">
          <img src={Instadash} className="w-[2.5rem] h-[2.5rem] top-2" />
          <div className="text-xl font-bold text-red-500">DASHED EATS</div>
        </div>
      </div>
    </div>
  );
};

export default AuthBar;
