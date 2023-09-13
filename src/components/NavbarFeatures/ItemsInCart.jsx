import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addOneCart,
  deleteCart,
  minusOneCart,
} from "../../redux-store/cartSlice";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";

const ItemsInCart = ({ id, item, cartMenuClose, handleFoodModal }) => {
  const dispatch = useDispatch();
  const [addedItem, setAddedItem] = useState();
  const [filteredItem, setFilteredItem] = useState();
  const user_id = useSelector((state) => state.auth.user.user_id);
  const cart = useSelector((state) => state.cart.cart);

  useEffect(() => {
    const itemCheck = cart.filter((cart) => cart.id == id);
    setFilteredItem(itemCheck[0]);
    // console.log("itemcheck", itemCheck[0]);
  }, [cart]);
  // console.log("filtered item", filteredItem);
  if (filteredItem)
    return (
      <div className="flex px-4 pt-4 space-x-2 justify-between items-center w-full h-[5rem] rounded-md z-10 cursor-pointer">
        <div
          className="flex w-[15rem] h-fit bg-white space-x-3"
          onClick={() => {
            handleFoodModal({
              itemId: item.id,
              name: item.name,
              description: item.description,
              image: item.image,
              price: item.prices,
              quantity: filteredItem.quantity,
            });
            cartMenuClose();
          }}
        >
          <img
            src={`../../..${item.image}`}
            className=" w-[5rem] h-[5rem] object-cover max-h-full"
          />
          <div className="flex flex-col justify-center">
            <div className="text-sm text-start max-h-fit line-clamp-3">
              {item.name}
            </div>
            <div className="text-md text-start">${item.prices}</div>
          </div>
        </div>
        <div className="rounded-full bg-gray-50 shadow shadow-gray-300 h-[1.8rem] w-[6rem] flex items-center justify-between">
          <div
            className="rounded-full shadow shadow-gray-300 bg-white h-full w-[1.8rem] flex justify-center items-center"
            onClick={
              addedItem == item.id && filteredItem.quantity !== 1
                ? (e) => {
                    dispatch(minusOneCart({ user_id, cart_id: id }));
                    e.stopPropagation();
                  }
                : (e) => {
                    dispatch(deleteCart({ user_id, cart_id: id }));
                    e.stopPropagation();
                  }
            }
          >
            {addedItem == item.id && filteredItem.quantity !== 1 ? (
              <AiOutlineMinus size={15} />
            ) : (
              <FaTrash size={15} className="fill-gray-500" />
            )}
          </div>
          <div className="text-sm">{filteredItem.quantity}</div>
          <div
            className="rounded-full shadow shadow-gray-300 bg-white h-full w-[1.8rem] flex justify-center items-center"
            onClick={(e) => {
              setAddedItem(item.id);
              dispatch(addOneCart({ user_id, cart_id: id }));
              e.stopPropagation();
            }}
          >
            <AiOutlinePlus size={15} />
          </div>
        </div>
      </div>
    );
};

export default ItemsInCart;
