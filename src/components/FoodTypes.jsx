import React from "react";
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

const FoodTypes = () => {
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
  //  mx-[15rem]
  // left-[15rem] relative flex-shrink-0
  return (
    <div className="h-screen text-black">
      <div className="scroll-smooth flex flex-row justify-center pl-3">
        <div
          className="flex flex-row
       w-[90rem] overscroll-x-contain overflow-x-scroll 
       top-[9rem] right-[15rem] snap-x container-snap"
        >
          {foods.map(({ id, name, src }) => (
            <div
              key={id}
              className="flex mx-auto flex-col justify-center items-center 
              space-x-6 snap-start space-y-2 py-4 pr-[.5rem]"
            >
              <div className="w-9 h-9 relative">
                <img className="justify-center" src={src} />
              </div>
              <div className="truncate text-sm pr-5 top-[.5rem] relative">
                {name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodTypes;
