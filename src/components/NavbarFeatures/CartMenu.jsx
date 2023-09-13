import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addOneCart,
  deleteCart,
  minusOneCart,
} from "../../redux-store/cartSlice";
import FoodModal from "../Store/FoodModal";
import * as pickupAPI from "../../Api/pickup";
import { CgClose } from "react-icons/cg";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import PlateIcon from "../../assets/icons/plateicon.png";
import { currencyFormat, formatAddress } from "../Util/helperFunctions";
import Loading from "../Util/Loading";
import ItemsInCart from "./ItemsInCart";

const CartMenu = ({
  handleCartMenu,
  slideCartRef,
  cartMenuClose,
  handleFoodModal,
}) => {
  const dispatch = useDispatch();
  const [addedItem, setAddedItem] = useState();
  let [mappedCart, setMappedCart] = useState([]);
  let [placeIds, setPlaceIds] = useState([]);
  let [loading, setLoading] = useState();
  const user_id = useSelector((state) => state.auth.user.user_id);
  const cart = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();
  const goCheckout = (placeId) => {
    navigate("/checkout", {
      state: { cartInfo: mappedCart[placeId], place_id: placeId },
    });
    cartMenuClose();
  };
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      mappedCart = [];
      placeIds = [];
      if (cart)
        for (let i = 0; i < cart.length; i++) {
          if (mappedCart[cart[i].place_id]) {
            mappedCart[cart[i].place_id].items.push(cart[i]);
            mappedCart[cart[i].place_id].total +=
              cart[i].quantity * +cart[i].items_info.prices;
            mappedCart[cart[i].place_id].quantity += cart[i].quantity;
          } else {
            placeIds.push(cart[i].place_id);
            mappedCart[cart[i].place_id] = {};
            mappedCart[cart[i].place_id].items = [];
            mappedCart[cart[i].place_id].total =
              cart[i].quantity * +cart[i].items_info.prices;
            mappedCart[cart[i].place_id].quantity = cart[i].quantity;
            const placeDetails = await pickupAPI.getPlaceDetails({
              place_id: cart[i].place_id,
            });
            mappedCart[cart[i].place_id].name = placeDetails.result.name;
            mappedCart[cart[i].place_id].geometry =
              placeDetails.result.geometry.location;
            mappedCart[cart[i].place_id].address =
              placeDetails.result.formatted_address;
            mappedCart[cart[i].place_id].items.push(cart[i]);
          }
        }
      setMappedCart(mappedCart);
      setPlaceIds(placeIds);
      setLoading(false);
    }
    fetchData();
  }, [cart]);
  console.log("mapped cart ", mappedCart);
  if (loading) return <Loading />;
  else
    return (
      <div className="" ref={slideCartRef}>
        <div className="py-[1.5rem] px-[1rem] cursor-pointer">
          <CgClose size={22} onClick={() => handleCartMenu()} />
        </div>

        {cart?.length > 0 ? (
          <div className="space-y-6 divide-y divide-solid scroll-smooth overflow-y-scroll container-snap">
            {placeIds.map((ids) => {
              if (mappedCart[ids])
                return (
                  <div key={ids} className="space-y-3 h-full">
                    <div className="w-full h-[5.5rem] space-y-3">
                      <div className="flex justify-between items-center px-4">
                        <div>
                          <div className="text-xs font-semibold text-gray-500">
                            Your cart from
                          </div>
                          <div className="font-semibold">
                            {mappedCart[ids].name}
                          </div>
                        </div>
                        <div className="text-sm font-semibold">
                          {formatAddress(mappedCart[ids].address)[0]}
                        </div>
                      </div>
                      <div className="flex w-full px-4 justify-center items-center">
                        <div
                          className="w-full h-[2.5rem] rounded-full bg-red-600 flex items-center justify-between px-3 text-white cursor-pointer"
                          onClick={() => goCheckout(ids)}
                        >
                          <div>Checkout</div>
                          <div>{currencyFormat(mappedCart[ids].total)}</div>
                        </div>
                      </div>
                    </div>
                    {mappedCart[ids].items.map(
                      ({ id, items_info, quantity }) => (
                        <ItemsInCart
                          key={id}
                          id={id}
                          item={items_info}
                          quantity={quantity}
                          cartMenuClose={cartMenuClose}
                          handleFoodModal={handleFoodModal}
                        />
                      )
                    )}
                  </div>
                );
            })}
          </div>
        ) : (
          <div
            className="relative top-[4.2rem] left-[1.2rem] space-y-[1.8rem] flex flex-col
              overscroll-y-contain overflow-y-scroll container-snap"
          >
            <div className="items-center">
              <img src={PlateIcon} className="h-[17rem] w-[17rem]" />
              <div className="relative left-[1.4rem]  font-bold text-lg">
                Cart is Empty
              </div>
            </div>
          </div>
        )}
      </div>
    );
};

export default CartMenu;
