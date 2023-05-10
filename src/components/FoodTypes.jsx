import React, { useRef, useState } from "react";
import FastFood from "../assets/foodtype/fastFood.png";
import Mexican from "../assets/foodtype/mexican.png";
import Dessert from "../assets/foodtype/dessert.png";
import Chicken from "../assets/foodtype/chicken.png";
import Burger from "../assets/foodtype/burger.png";
import Soup from "../assets/foodtype/soup.png";
import Snack from "../assets/foodtype/snack.png";
import Pizza from "../assets/foodtype/pizza.png";
import Drinks from "../assets/foodtype/drinks.png";
import Chinese from "../assets/foodtype/chinese.png";
import Sandwiches from "../assets/foodtype/sandwiches.png";
import Smoothie from "../assets/foodtype/smoothie.png";
import Coffee from "../assets/foodtype/coffee.png";
import Healthy from "../assets/foodtype/healthy.png";
import Breakfast from "../assets/foodtype/breakfast.png";
import Salad from "../assets/foodtype/salad.png";
import Italian from "../assets/foodtype/italian.png";
import Seafood from "../assets/foodtype/seafood.png";
import Barbecue from "../assets/foodtype/barbeque.png";
import Bakery from "../assets/foodtype/bakery.png";
import Asian from "../assets/foodtype/asianfood.png";
import Thai from "../assets/foodtype/thai.png";
import { TbChevronLeft, TbChevronRight } from "react-icons/Tb";

const FoodTypes = () => {
  const ref = useRef(null);
  const [disableButton, setDisableButton] = useState("left");

  const foods = [
    { id: 1, name: "Fast Food", src: FastFood },
    { id: 2, name: "Mexican", src: Mexican },
    { id: 3, name: "Desserts", src: Dessert },
    { id: 4, name: "Chicken", src: Chicken },
    { id: 5, name: "Burgers", src: Burger },
    { id: 6, name: "Soup", src: Soup },
    { id: 7, name: "Snacks", src: Snack },
    { id: 8, name: "Pizza", src: Pizza },
    { id: 9, name: "Drinks", src: Drinks },
    { id: 10, name: "Chinese", src: Chinese },
    { id: 11, name: "Sandwiches", src: Sandwiches },
    { id: 12, name: "Smoothie", src: Smoothie },
    { id: 13, name: "Coffee", src: Coffee },
    { id: 14, name: "Healthy", src: Healthy },
    { id: 15, name: "Breakfast", src: Breakfast },
    { id: 16, name: "Salad", src: Salad },
    { id: 17, name: "Italian", src: Italian },
    { id: 18, name: "Seafood", src: Seafood },
    { id: 19, name: "Barbeque", src: Barbecue },
    { id: 20, name: "Bakery", src: Bakery },
    { id: 21, name: "Asian", src: Asian },
    { id: 22, name: "Thai", src: Thai },
  ];
  function scrollTabbar(element, left) {
    element.scrollTo({
      left,
    });
  }
  function adjustView(position) {
    if (position === "left") {
      scrollTabbar(ref?.current, 0);
    } else {
      scrollTabbar(ref?.current, ref.current?.scrollWidth);
    }
  }
  const handleScroll = () => {
    if (ref.current) {
      const { scrollLeft, scrollWidth, clientWidth } = ref.current;
      switch (scrollLeft + clientWidth) {
        case clientWidth:
          setDisableButton("left");
          break;
        case scrollWidth:
          setDisableButton("right");
          break;
        default:
          setDisableButton("none");
      }
    }
  };
  return (
    <div className="h-full text-black">
      <div className="flex flex-row justify-center space-x-3">
        <div>
          {disableButton !== "left" && (
            <div className="py-[2rem]">
              <div
                className="rounded-full h-8 w-8 border-solid border-2
                  border-gray-100"
              >
                <button
                  className="pl-[.1rem] pt-[.2rem]"
                  onClick={() => adjustView("left")}
                >
                  <TbChevronLeft size={23} />
                </button>
              </div>
            </div>
          )}
        </div>
        <div
          className="flex flex-row
       w-[75.5rem] overscroll-x-contain overflow-x-scroll pl-3
       top-[9rem] right-[15rem] container-snap scroll-smooth space-x-[2.2rem]"
          ref={ref}
          onScroll={handleScroll}
        >
          {foods.map(({ id, name, src }) => (
            <div
              key={id}
              className="flex mx-auto flex-col justify-center items-center 
             space-y-2 py-4 pr-[.5rem] cursor-pointer"
            >
              <div className="w-9 h-9">
                <img className="relative" src={src} />
              </div>
              <div className="truncate text-sm top-[.5rem] relative items-center ">
                {name}
              </div>
            </div>
          ))}
        </div>
        <div>
          {disableButton !== "right" && (
            <div className="py-[2rem] ">
              <div
                className="rounded-full h-8 w-8 border-solid border-2
                  border-gray-100"
              >
                <button
                  className="pl-[.2rem] pt-[.2rem]"
                  onClick={() => adjustView("right")}
                >
                  <TbChevronRight size={23} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodTypes;
