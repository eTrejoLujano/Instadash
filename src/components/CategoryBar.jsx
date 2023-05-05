import React from "react";
import Convenience from "../assets/category/convenience.png";
import Alcohol from "../assets/category/alcohol.png";
import Flowers from "../assets/category/flowers.svg";
import Shipping from "../assets/category/shipping.png";
import Grocery from "../assets/category/grocery.png";
import Gifts from "../assets/category/gifts.png";
import Pets from "../assets/category/pets.png";
import Packages from "../assets/category/packages.png";

function CategoryBar() {
  const categories = [
    { id: 1, name: "Convenience", src: Convenience },
    { id: 2, name: "Grocery", src: Grocery },
    { id: 3, name: "Alcohol", src: Alcohol },
    { id: 4, name: "Pets", src: Pets },
    { id: 5, name: "Flowers", src: Flowers },
    { id: 6, name: "Shipping", src: Shipping },
    { id: 7, name: "Packages", src: Packages },
    { id: 8, name: "Gifts", src: Gifts },
  ];
  return (
    <div
      className="h-[8.8rem] text-black bg-gray-100 border-solid border 
    border-gray-100"
    >
      <div className="scroll-smooth flex flex-row justify-center">
        <div
          className="flex flex-row items-center
    h-[7rem] my-11  mx-auto overflow-x-scroll overscroll-x-contain container-snap space-x-3"
        >
          {/* <ul className="flex flex-row justify-center mx-auto space-x-3 snap-x  "> */}
          {categories.map(({ id, name, src }) => (
            <div
              key={id}
              className="rounded-full py-2.5 px-4 text-sm bg-white 
              flex flex-row space-x-6"
            >
              <div className="pr-2.5 rounded-full h-9 w-9 bg-sky-100 ">
                <div className="w-9">
                  <img src={src} className="" />
                </div>
              </div>
              <div className="pt-1.5 text-base">{name}</div>
            </div>
          ))}
          {/* </ul> */}
        </div>
      </div>
    </div>
  );
}

export default CategoryBar;
