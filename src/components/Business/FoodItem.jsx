import React from "react";

const FoodItem = () => {
  return (
    <div className="space-y-[-.5rem]">
      <div className="flex justify-between items-center w-full h-[8rem] md:border rounded-md">
        <div className="space-y-1 md:px-4">
          <div>Food Name</div>
          <div>Ingredients</div>
          <div>price</div>
        </div>
        <div>image</div>
      </div>
      <div className="flex md:invisible w-full h-[.05rem] rounded bg-gray-200" />
    </div>
  );
};

export default FoodItem;
