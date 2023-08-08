import React from "react";

const FoodItem = ({ id, name, description, image, price }) => {
  console.log(image);
  return (
    <div className="space-y-[-.5rem]">
      <div className="flex justify-between items-center w-full h-[9rem] md:border border-b-2 rounded-md z-10">
        <div className="space-y-1 md:px-4">
          <div className="text-md">{name}</div>
          <p className="line-clamp-2 text-sm">{description}</p>
          <div className="text-md">${price}</div>
        </div>
        <div className="max-h-fit w-[9rem] flex flex-col justify-center bg-white rounded-r-md">
          <img
            src={`../../..${image}`}
            className="max-w-fit h-[9rem] border-t border-b rounded-r-md"
          />
        </div>
      </div>
      <div className="flex md:invisible w-full h-[.05rem] rounded bg-gray-200" />
    </div>
  );
};

export default FoodItem;
