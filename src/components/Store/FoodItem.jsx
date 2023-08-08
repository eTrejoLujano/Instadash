import React from "react";

const FoodItem = ({ id, name, description, image, price }) => {
  console.log(image);
  return (
    <div className="space-y-[-.5rem]">
      <button
        data-modal-target="defaultModal"
        data-modal-toggle="defaultModal"
        className="flex justify-between items-center w-full h-[9rem] md:border border-b-2 rounded-md z-10"
        type="button"
      >
        <div className="space-y-1 md:px-4">
          <div className="text-md font-bold text-start">{name}</div>
          <p className="line-clamp-2 text-sm text-start">{description}</p>
          <div className="text-md text-start">${price}</div>
        </div>
        <div className="max-h-fit w-[9rem] flex flex-col justify-center bg-white rounded-r-md">
          <img
            src={`../../..${image}`}
            className="max-w-fit h-[9rem] border-t border-b rounded-r-md object-cover"
          />
          <div className="flex flex-col items-end w-full h-full relative bottom-[2.6rem] right-[.6rem]">
            <div className="absolute rounded-full w-[3rem] h-[1.9rem] bg-white flex flex-col justify-center items-center shadow-sm shadow-gray-400">
              <button className="text-sm font-semibold">Add</button>
            </div>
          </div>
        </div>
      </button>
      <div
        id="defaultModal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        Hi
      </div>
      <div className="flex md:invisible w-full h-[.05rem] rounded bg-gray-200" />
    </div>
  );
};

export default FoodItem;
