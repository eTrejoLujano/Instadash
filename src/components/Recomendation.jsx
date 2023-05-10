import React from "react";
import Mcdonalds from "../assets/restaurants/mcdonalds.jpeg";
import Tacobell from "../assets/restaurants/tacobell.jpeg";
import Starbucks from "../assets/restaurants/starbucks.jpeg";
import Chickfila from "../assets/restaurants/chickfila.png";
import Wendys from "../assets/restaurants/wendys.jpeg";
import Burgerking from "../assets/restaurants/burgerking.jpeg";
import Jackinthebox from "../assets/restaurants/jackinthebox.jpeg";
import Panerabread from "../assets/restaurants/panerabread.jpeg";
import Meltdown from "../assets/restaurants/themeltdown.jpeg";
import DashIcon from "../assets/restaurants/doordashicon.png";

// INSTADASH

const favorites = [
  { id: 1, name: "Starbucks", src: Starbucks },
  { id: 2, name: "Mcdonald's", src: Mcdonalds },
  { id: 3, name: "Taco Bell", src: Tacobell },
  { id: 4, name: "Chick-fil-A", src: Chickfila },
  { id: 5, name: "Wendy's", src: Wendys },
  { id: 6, name: "Burger King", src: Burgerking },
  { id: 7, name: "Jack in the Box", src: Jackinthebox },
  { id: 8, name: "Panera Bread", src: Panerabread },
  { id: 9, name: "The Meltdown", src: Meltdown },
];
const Recomendation = () => {
  return (
    <div className="h-full ">
      {/* <div className="flex flex-row"> */}
      <h2 className="font-semibold text-2xl pl-[22rem]">National Favorites</h2>
      {/* </div> */}
      <div className="flex flex-row justify-center pt-[1rem]">
        <div
          className="flex flex-row
       w-[75.5rem] overscroll-x-contain overflow-x-scroll
       top-[9rem] right-[15rem] container-snap scroll-smooth space-x-[1rem]"
          //   ref={ref}
          //   onScroll={handleScroll}
        >
          {favorites.map(({ id, name, src }) => (
            <div key={id} className="rounded-lg flex flex-col space-y-[-1rem]">
              <div className="h-[14rem] w-[24.5rem]">
                <img
                  alt=""
                  src={src}
                  className="rounded-md relative w-[30rem] h-[12rem]"
                />
              </div>
              <div className="font-semibold relative truncate">
                <img
                  alt=""
                  src={DashIcon}
                  className="rounded-md relative w-[1] h-[1]"
                />
                {name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recomendation;
