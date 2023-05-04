import React from "react";

const FoodTypes = () => {
  const foods = [
    { id: 1, name: "Fast Food" },
    { id: 2, name: "Mexican" },
    { id: 3, name: "Desserts" },
    { id: 4, name: "Chicken" },
    { id: 5, name: "Burgers" },
    { id: 6, name: "Soup" },
    { id: 7, name: "Snacks" },
    { id: 8, name: "Pizza" },
    { id: 9, name: "Drinks" },
    { id: 10, name: "Chinese" },
    { id: 11, name: "Sandwiches" },
    { id: 12, name: "Smoothie" },
    { id: 13, name: "Coffee" },
    { id: 14, name: "Healthy" },
    { id: 15, name: "Breakfast" },
    { id: 16, name: "Salad" },
    { id: 17, name: "Italian" },
    { id: 18, name: "Seafood" },
    { id: 19, name: "Barbecue" },
    { id: 20, name: "Bakery" },
    { id: 21, name: "Asian" },
    { id: 22, name: "Thai" },
  ];
  return (
    <div className="w-full h-screen text-black">
      <div className="max-w-screen-lg px-[17.5rem] lex w-1/3 h-full">
        <ul className="flex flex-row">
          {foods.map(({ id, name }) => (
            <li key={id} className="flex flex-col">
              {name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FoodTypes;
