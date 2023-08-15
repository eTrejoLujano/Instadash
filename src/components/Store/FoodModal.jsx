import { useState, useEffect } from "react";
import { VscClose } from "react-icons/vsc";
import { BiMinusCircle, BiPlusCircle } from "react-icons/bi";
import { currencyFormat } from "../Util/helperFunctions";

const FoodModal = ({ name, description, image, price, handleClose }) => {
  const [itemQuantity, setItemQuantity] = useState(1);

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 ">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-2xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="w-[34rem] max-h-fit space-y-[2rem] px-[.5rem] py-4">
              <VscClose
                size={36}
                className="pb-2 cursor-pointer"
                onClick={() => handleClose()}
              />
              <div className="px-[.6rem] space-y-[1.6rem]">
                <div className="text-3xl font-bold">{name}</div>
                <div className="text-sm font-medium text-gray-500">
                  {description}
                </div>
                <div>
                  <img
                    src={`../../..${image}`}
                    className="w-[31.8rem] max-h-fit"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <div className="w-full h-[.05rem] rounded bg-gray-300" />
                <div className="flex justify-end items-center space-x-[1.5rem] px-3">
                  <BiMinusCircle
                    size={24}
                    className="text-gray-500"
                    onClick={
                      itemQuantity === 0
                        ? null
                        : () => setItemQuantity(itemQuantity - 1)
                    }
                  />
                  <div className="w-[3.5rem] h-[2.3rem] bg-gray-200 rounded-md flex justify-center items-center">
                    {itemQuantity}
                  </div>
                  <BiPlusCircle
                    size={24}
                    className="text-gray-500"
                    onClick={() => setItemQuantity(itemQuantity + 1)}
                  />
                  <div className="w-[12rem] h-[2.6rem] bg-red-500 text-white flex justify-center items-center rounded-full">
                    Add to cart - {currencyFormat(itemQuantity * price)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default FoodModal;
