import { useState } from "react";
import FoodTypes from "./FoodTypes";
import Filterbar from "./Filterbar";
import Ads from "./Ads";

import StoreOptions from "./StoreOptions";

import Mcdonalds from "../../assets/restaurants/mcdonalds.jpeg";
import Tacobell from "../../assets/restaurants/tacobell.jpeg";
import Starbucks from "../../assets/restaurants/starbucks.jpeg";
import Chickfila from "../../assets/restaurants/chickfila.png";
import Wendys from "../../assets/restaurants/wendys.jpeg";
import Burgerking from "../../assets/restaurants/burgerking.jpeg";
import Jackinthebox from "../../assets/restaurants/jackinthebox.jpeg";
import Panerabread from "../../assets/restaurants/panerabread.jpeg";
import Meltdown from "../../assets/restaurants/themeltdown.jpeg";
import Togos from "../../assets/restaurants/togos.png";
import Dunkin from "../../assets/restaurants/dunkin.jpeg";
import Petescoffee from "../../assets/restaurants/petescoffee.jpeg";
import Cvs from "../../assets/convenience/cvs.jpeg";
import Riteaid from "../../assets/convenience/riteaid.webp";
import Seven11 from "../../assets/convenience/seven11.jpg";
import Walgreens from "../../assets/convenience/walgreens.jpeg";
import Cardenas from "../../assets/convenience/cardenas.jpeg";
import Groceryoutlet from "../../assets/convenience/groceryoutlet.png";
import Safeway from "../../assets/convenience/safeway.webp";
import Smartfinal from "../../assets/convenience/smartfinal.jpeg";
import Sprouts from "../../assets/convenience/sprouts.jpeg";
import Target from "../../assets/convenience/target.jpeg";

import Convenience from "../../assets/category/convenience.png";
import Alcohol from "../../assets/category/alcohol.png";
import Flowers from "../../assets/category/flowers.svg";
import Shipping from "../../assets/category/shipping.png";
import Grocery from "../../assets/category/grocery.png";
import Gifts from "../../assets/category/gifts.png";
import Pets from "../../assets/category/pets.png";
import Packages from "../../assets/category/packages.png";

const UserHome = () => {
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: "Starbucks",
      src: Starbucks,
      save: false,
      distance: "1.0 mi",
      time: "20 min",
      fee: "$1.99 Delivery Fee",
      rate: "4.7",
      reviews: "(2,300+)",
    },
    {
      id: 2,
      name: "Mcdonald's",
      src: Mcdonalds,
      save: false,
      distance: "1.0 mi",
      time: "20 min",
      fee: "$1.99 Delivery Fee",
      rate: "4.7",
      reviews: "(2,300+)",
    },
    {
      id: 3,
      name: "Taco Bell",
      src: Tacobell,
      save: false,
      distance: "1.0 mi",
      time: "20 min",
      fee: "$1.99 Delivery Fee",
      rate: "4.7",
      reviews: "(2,300+)",
    },
    {
      id: 4,
      name: "Chick-fil-A",
      src: Chickfila,
      save: false,
      distance: "1.0 mi",
      time: "20 min",
      fee: "$1.99 Delivery Fee",
      rate: "4.7",
      reviews: "(2,300+)",
    },
    {
      id: 5,
      name: "Wendy's",
      src: Wendys,
      save: false,
      distance: "1.0 mi",
      time: "20 min",
      fee: "$1.99 Delivery Fee",
      rate: "4.7",
      reviews: "(2,300+)",
    },
    {
      id: 6,
      name: "Burger King",
      src: Burgerking,
      save: false,
      distance: "1.0 mi",
      time: "20 min",
      fee: "$1.99 Delivery Fee",
      rate: "4.7",
      reviews: "(2,300+)",
    },
    {
      id: 7,
      name: "Jack in the Box",
      src: Jackinthebox,
      save: false,
      distance: "1.0 mi",
      time: "20 min",
      fee: "$1.99 Delivery Fee",
      rate: "4.7",
      reviews: "(2,300+)",
    },
    {
      id: 8,
      name: "Panera Bread",
      src: Panerabread,
      save: false,
      distance: "1.0 mi",
      time: "20 min",
      fee: "$1.99 Delivery Fee",
      rate: "4.7",
      reviews: "(2,300+)",
    },
    {
      id: 9,
      name: "The Meltdown",
      src: Meltdown,
      save: false,
      distance: "1.0 mi",
      time: "20 min",
      fee: "$1.99 Delivery Fee",
      rate: "4.7",
      reviews: "(2,300+)",
    },
  ]);

  const [fastest, setFastest] = useState([
    {
      id: 2,
      name: "Togo's",
      src: Togos,
      save: false,
      distance: "1.0 mi",
      time: "20 min",
      fee: "$1.99 Delivery Fee",
      rate: "4.7",
      reviews: "(2,300+)",
    },
    {
      id: 3,
      name: "Dunkin'",
      src: Dunkin,
      save: false,
      distance: "1.0 mi",
      time: "20 min",
      fee: "$1.99 Delivery Fee",
      rate: "4.7",
      reviews: "(2,300+)",
    },
    {
      id: 5,
      name: "Wendy's",
      src: Wendys,
      save: false,
      distance: "1.0 mi",
      time: "20 min",
      fee: "$1.99 Delivery Fee",
      rate: "4.7",
      reviews: "(2,300+)",
    },
    {
      id: 6,
      name: "Burger King",
      src: Burgerking,
      save: false,
      distance: "1.0 mi",
      time: "20 min",
      fee: "$1.99 Delivery Fee",
      rate: "4.7",
      reviews: "(2,300+)",
    },
    {
      id: 4,
      name: "Chick-fil-A",
      src: Chickfila,
      save: false,
      distance: "1.0 mi",
      time: "20 min",
      fee: "$1.99 Delivery Fee",
      rate: "4.7",
      reviews: "(2,300+)",
    },
    {
      id: 7,
      name: "Jack in the Box",
      src: Jackinthebox,
      save: false,
      distance: "1.0 mi",
      time: "20 min",
      fee: "$1.99 Delivery Fee",
      rate: "4.7",
      reviews: "(2,300+)",
    },
  ]);

  const [breakfast, setBreakfast] = useState([
    {
      id: 2,
      name: "Peet's Coffee",
      src: Petescoffee,
      save: false,
      distance: "1.0 mi",
      time: "20 min",
      fee: "$1.99 Delivery Fee",
      rate: "4.7",
      reviews: "(2,300+)",
    },
    {
      id: 5,
      name: "Starbucks",
      src: Starbucks,
      save: false,
      distance: "1.0 mi",
      time: "20 min",
      fee: "$1.99 Delivery Fee",
      rate: "4.7",
      reviews: "(2,300+)",
    },
    {
      id: 3,
      name: "Dunkin'",
      src: Dunkin,
      save: false,
      distance: "1.0 mi",
      time: "20 min",
      fee: "$1.99 Delivery Fee",
      rate: "4.7",
      reviews: "(2,300+)",
    },
    {
      id: 6,
      name: "Panera Bread",
      src: Panerabread,
      save: false,
      distance: "1.0 mi",
      time: "20 min",
      fee: "$1.99 Delivery Fee",
      rate: "4.7",
      reviews: "(2,300+)",
    },
  ]);

  const [convenience, setConvenience] = useState([
    {
      id: 1,
      name: "7-Eleven",
      src: Seven11,
      save: false,
      distance: "1.0 mi",
      time: "20 min",
      fee: "$1.99 Delivery Fee",
      rate: "4.7",
      reviews: "(2,300+)",
    },
    {
      id: 2,
      name: "CVS",
      src: Cvs,
      save: false,
      distance: "1.0 mi",
      time: "20 min",
      fee: "$1.99 Delivery Fee",
      rate: "4.7",
      reviews: "(2,300+)",
    },
    {
      id: 3,
      name: "Rite Aid",
      src: Riteaid,
      save: false,
      distance: "1.0 mi",
      time: "20 min",
      fee: "$1.99 Delivery Fee",
      rate: "4.7",
      reviews: "(2,300+)",
    },
    {
      id: 4,
      name: "Walgreens",
      src: Walgreens,
      save: false,
      distance: "1.0 mi",
      time: "20 min",
      fee: "$1.99 Delivery Fee",
      rate: "4.7",
      reviews: "(2,300+)",
    },
  ]);

  const [grocery, setGrocery] = useState([
    {
      id: 1,
      name: "Cardenas",
      src: Cardenas,
      save: false,
      distance: "1.0 mi",
      time: "20 min",
      fee: "$1.99 Delivery Fee",
      rate: "4.7",
      reviews: "(2,300+)",
    },
    {
      id: 2,
      name: "Grocery Outlet",
      src: Groceryoutlet,
      save: false,
      distance: "1.0 mi",
      time: "20 min",
      fee: "$1.99 Delivery Fee",
      rate: "4.7",
      reviews: "(2,300+)",
    },
    {
      id: 3,
      name: "Safeway",
      src: Safeway,
      save: false,
      distance: "1.0 mi",
      time: "20 min",
      fee: "$1.99 Delivery Fee",
      rate: "4.7",
      reviews: "(2,300+)",
    },
    {
      id: 4,
      name: "Target",
      src: Target,
      save: false,
      distance: "1.0 mi",
      time: "20 min",
      fee: "$1.99 Delivery Fee",
      rate: "4.7",
      reviews: "(2,300+)",
    },
    {
      id: 5,
      name: "Smart & Final",
      src: Smartfinal,
      save: false,
      distance: "1.0 mi",
      time: "20 min",
      fee: "$1.99 Delivery Fee",
      rate: "4.7",
      reviews: "(2,300+)",
    },
    {
      id: 6,
      name: "Sprouts",
      src: Sprouts,
      save: false,
      distance: "1.0 mi",
      time: "20 min",
      fee: "$1.99 Delivery Fee",
      rate: "4.7",
      reviews: "(2,300+)",
    },
  ]);

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
    <div>
      <div
        className="lg:h-[8.8rem] h-[5rem] text-black bg-gray-100 border-solid border 
    border-gray-100"
      >
        <div className="scroll-smooth flex flex-row justify-center">
          <div
            className="flex flex-row items-center
        lg:h-[7rem] h-[4.6rem] lg:my-11 overflow-x-scroll overscroll-x-contain 
        container-snap space-x-3"
          >
            {categories.map(({ id, name, src }) => (
              <div
                key={id}
                className="rounded-full py-2.5 px-2 text-sm bg-white 
              flex flex-row space-x-2 cursor-pointer"
              >
                <div className="rounded-full h-9 w-9 bg-sky-100 ">
                  <div className="w-9">
                    <img src={src} className="" />
                  </div>
                </div>
                <div className="pt-1.5 text-base">{name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FoodTypes />
      <Filterbar />
      <Ads />
      <div className="space-y-5 pt-1">
        <StoreOptions stores={favorites} name="National Favorites" />
        <StoreOptions stores={fastest} name="Fastest Near You" />
        <StoreOptions stores={breakfast} name="Best of Breakfast" />
        <StoreOptions stores={convenience} name="Convenience & Drugstores" />
        <StoreOptions stores={grocery} name="Grocery" />
      </div>
    </div>
  );
};

export default UserHome;
