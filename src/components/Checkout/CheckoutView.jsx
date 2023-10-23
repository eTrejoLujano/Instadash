import { useState, useEffect } from "react";
import DashedEats from "../../assets/icons/instadash.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as pickupAPI from "../../Api/pickup";
import * as storeAPI from "../../Api/store";
import * as checkoutAPI from "../../Api/checkout";
import { currencyFormat, formatAddress } from "../Util/helperFunctions";
import StoreMapWrapper from "../Store/StoreMapWrapper";
import { FaStoreAlt, FaRegCreditCard } from "react-icons/fa";
import { AiOutlineClockCircle } from "react-icons/ai";
import { RxHome } from "react-icons/rx";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import AddressModal from "../NavbarFeatures/AddressModal";
import Loading from "../Util/Loading";
import { getCart } from "../../redux-store/cartSlice";
import ItemsInCart from "../NavbarFeatures/ItemsInCart";
import FoodModal from "../Store/FoodModal";

const CheckoutView = () => {
  let [isDelivery, setIsDelivery] = useState(true);
  let [tipChoice, setTipChoice] = useState(0.2);
  let [travelInfo, setTravelInfo] = useState();
  let [storeInfo, setStoreInfo] = useState();
  let [items, setItems] = useState();
  let [totalQuantity, setTotalQuantity] = useState(0);
  let [subtotalAmount, setSubtotalAmount] = useState(0);
  const [checkoutButton, setCheckoutButton] = useState(false);
  const [addressModal, setAddressModal] = useState(false);
  const [taxes, setTaxes] = useState(0.0975);
  const [fees, setFees] = useState(3);
  const [orderTotal, setOrderTotal] = useState();
  const [deliveryFee, setDeliveryFee] = useState(5.99);
  const [foodModal, setFoodModal] = useState(false);
  const [modalInfo, setModalInfo] = useState();
  const [orderSummary, setOrderSummary] = useState(false);
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart.cart);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      if (auth.location) {
        subtotalAmount = 0;
        const travel = await pickupAPI.getDistance({
          destinations: location.state.cartInfo.address,
          origins: auth.location.address,
        });
        const storeInfo = await storeAPI.getStoreByName({
          store_name: location.state.cartInfo.name,
        });
        for (let i = 0; i < cart.length; i++) {
          if (location.state.place_id == cart[i].place_id) {
            subtotalAmount += cart[i].quantity * +cart[i].items_info.prices;
          }
        }
        setSubtotalAmount(subtotalAmount);
        setTotalQuantity(totalQuantity);
        setStoreInfo(storeInfo);
        setTravelInfo(travel.rows[0].elements[0]);
        setOrderTotal(
          subtotalAmount +
            subtotalAmount * taxes +
            (isDelivery ? fees : 0) +
            (isDelivery ? deliveryFee : 0) +
            (isDelivery ? subtotalAmount * tipChoice : 0)
        );
        // setTaxesAndFees(subtotalAmount * 0.0975 + (isDelivery ? 3 : 0));
        setItems(location.state.cartInfo.items);
      }
    }
    fetchData();
  }, [isDelivery, dispatch, cart, tipChoice]);

  const checkout = async ({
    origin,
    origin_lat,
    origin_lng,
    destination,
    destination_lat,
    destination_lng,
    total,
  }) => {
    const orderInfo = await checkoutAPI.createOrder({
      origin,
      origin_lat,
      origin_lng,
      destination,
      isDelivery,
      destination_lat,
      destination_lng,
      total,
      totalQuantity: location.state.cartInfo.quantity,
    });
    for (let i = 0; i < items.length; i++) {
      await checkoutAPI.checkout({
        user_id: auth.user.user_id,
        item_id: items[i].item,
        order_id: orderInfo[0].id,
      });
    }
    dispatch(getCart({ user_id: auth.user.user_id }));
    navigate("/orders");
  };
  const handleClose = () => {
    setAddressModal(false);
  };
  const handleFoodModal = (object) => {
    setFoodModal(true);
    setModalInfo(object);
  };
  const closeFoodModal = () => {
    setFoodModal(false);
  };
  const placeOrder = () => {
    checkout({
      origin: auth.location.address,
      origin_lat: auth.location.latitude,
      origin_lng: auth.location.longitude,
      destination: location.state.cartInfo.address,
      destination_lat: location.state.cartInfo.geometry.lat,
      destination_lng: location.state.cartInfo.geometry.lng,
      total: orderTotal,
    });
  };
  if (!travelInfo) return <Loading />;
  else
    return (
      <div>
        {addressModal && <AddressModal handleClose={handleClose} />}
        {foodModal && (
          <FoodModal
            itemId={modalInfo.itemId}
            name={modalInfo.name}
            description={modalInfo.description}
            image={modalInfo.image}
            price={modalInfo.price}
            quantity={modalInfo.quantity}
            handleClose={closeFoodModal}
          />
        )}
        <div className="md:pt-[3.9rem] relative top-[7rem] md:top-0 w-full h-fit md:h-screen flex md:flex-row flex-col items-center justify-center">
          <div className="w-full h-fit md:h-full md:pt-[2rem] border-r flex flex-col items-center md:space-y-4">
            <div className="w-full lg:w-[40rem] h-[4rem] border rounded-lg hidden md:flex justify-between items-center px-4">
              <div className="font-bold">1. Account Details</div>
              <div>{auth.user.email}</div>
            </div>
            <div className="w-full lg:w-[40rem] h-fit md:border rounded-lg px-2 md:px-4 space-y-8">
              <div className="pt-[1rem] font-bold hidden md:flex">
                2. Shipping Details
              </div>
              <div className="flex flex-col w-full items-center md:px-0 px-2 space-y-4 pb-4">
                {!isDelivery && (
                  <div className="w-full h-fit">
                    <StoreMapWrapper
                      lat={location.state.cartInfo.geometry.lat}
                      lng={location.state.cartInfo.geometry.lng}
                      logo={storeInfo[0].logo}
                    />
                  </div>
                )}

                <div className="w-[22rem] h-[2rem] rounded-full border flex justify-between items-center bg-gray-200 cursor-pointer">
                  <div
                    className={`text-sm w-1/2 flex justify-center items-center ${
                      isDelivery && "rounded-full text-white h-full bg-black"
                    }`}
                    onClick={() => setIsDelivery(true)}
                  >
                    Delivery
                  </div>
                  <div
                    className={`text-sm w-1/2 flex justify-center items-center ${
                      !isDelivery && "rounded-full text-white h-full bg-black"
                    }`}
                    onClick={() => setIsDelivery(false)}
                  >
                    Pickup
                  </div>
                </div>
                {isDelivery ? (
                  <div className="flex justify-between w-full px-4">
                    <div className="flex space-x-5 items-center">
                      <div>
                        <AiOutlineClockCircle size={21} />
                      </div>
                      <div className="">Delivery Time</div>
                    </div>
                    <div>
                      {Math.floor((travelInfo.duration.value + 720) / 60)}-
                      {Math.floor((travelInfo.duration.value + 1320) / 60)} min
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between w-full px-4">
                    <div>Pickup Time</div>
                    <div>
                      {Math.floor(
                        (travelInfo.duration.value >= 300
                          ? travelInfo.duration.value
                          : 300) / 60
                      )}
                      -
                      {Math.floor(
                        ((travelInfo.duration.value >= 300
                          ? travelInfo.duration.value
                          : 300) +
                          480) /
                          60
                      )}
                      min
                    </div>
                  </div>
                )}
                {isDelivery ? (
                  <div
                    className="flex justify-between h-[4rem] w-full items-center cursor-pointer hover:bg-gray-100 px-4"
                    onClick={() => setAddressModal(true)}
                  >
                    <div className="flex space-x-5 items-center">
                      <div>
                        <RxHome size={21} />
                      </div>
                      <div>
                        <div className="text-sm">
                          {formatAddress(auth.location.address)[0]}
                        </div>
                        <div className="text-gray-500 text-sm">
                          {formatAddress(auth.location.address)[1]}
                        </div>
                      </div>
                    </div>
                    <div>
                      <MdOutlineArrowForwardIos
                        className="text-gray-700"
                        size={16}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between w-full px-4">
                    <div className="flex items-center space-x-4">
                      <div>
                        <FaStoreAlt size={24} className="text-gray-600" />
                      </div>
                      <div>
                        <div className="text-sm">{storeInfo[0].name}</div>
                        <div className="text-sm text-gray-500">
                          {location.state.cartInfo.address}
                        </div>
                      </div>
                    </div>
                    {isDelivery ? <div>Arrow</div> : <div></div>}
                  </div>
                )}
              </div>
            </div>
            <div className="w-full lg:w-[40rem] h-[4rem] md:border rounded-lg px-4 flex justify-between items-center">
              <div className="font-bold hidden md:flex">3. Payment</div>
              <div className="md:hidden flex items-center space-x-4">
                <div>
                  <FaRegCreditCard size={21} />
                </div>
                <div>Payment</div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-[2rem] w-[3rem] rounded-md border border-black flex justify-center items-center bg-white">
                  <img src={DashedEats} className="w-[1.5rem] h-[1.5rem]" />
                </div>
                <div className="text-sm font-semibold">Gift Card</div>
              </div>
            </div>
            <div
              className="w-full lg:w-[40rem] h-[2.5rem] rounded-full bg-red-600 hidden md:flex justify-between items-center px-4 cursor-pointer"
              onClick={() => placeOrder()}
            >
              <div className="text-white font-semibold">Place Order</div>
              <div className="text-white font-semibold">
                {currencyFormat(orderTotal)}
              </div>
            </div>
          </div>
          <div className="w-full md:w-[25rem] h-fit md:h-full pb-7">
            <div className="w-full md:w-[25rem] px-4 md:px-8 md:py-8 md:h-full space-y-6 overscroll-y-contain overflow-y-scroll container-snap">
              <div className="hidden md:flex items-center space-x-4">
                <div>
                  <img
                    src={storeInfo[0].logo}
                    className="w-[3rem] h-[3rem] object-contain rounded-full border border-gray-200 bg-white"
                  />
                </div>
                <div>
                  <div className="text-xs text-gray-400">Your cart from</div>
                  <div className=" text-black font-bold">
                    {storeInfo[0].name}
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col divide-solid divide-y space-y-5">
                <div>
                  <div
                    className="w-full h-[2.5rem] rounded-full bg-red-600 hidden md:flex justify-between items-center px-4 cursor-pointer"
                    onClick={() => placeOrder()}
                  >
                    <div className="text-white font-semibold">Place Order</div>
                    <div className="text-white font-semibold">
                      {currencyFormat(orderTotal)}
                    </div>
                  </div>
                  <div className="w-full h-fit pt-5">
                    <div
                      className="flex  justify-between items-center cursor-pointer del"
                      onClick={() => setOrderSummary((state) => !state)}
                    >
                      <div>Order Summary</div>
                      <div>
                        <MdOutlineArrowForwardIos
                          className="text-gray-700"
                          size={16}
                        />
                      </div>
                    </div>
                    <div>
                      {orderSummary &&
                        items &&
                        items.map(({ id, items_info, quantity }) => (
                          <ItemsInCart
                            key={id}
                            id={id}
                            item={items_info}
                            quantity={quantity}
                            // cartMenuClose={cartMenuClose}
                            handleFoodModal={handleFoodModal}
                          />
                        ))}
                    </div>
                  </div>
                </div>
                <div className="w-full h-fit flex justify-between pt-5">
                  <div className="space-y-2">
                    <div>Subtotal</div>
                    {isDelivery && <div>Delivery Fee</div>}
                    <div>Fees & Estimated Tax</div>
                  </div>
                  <div className="space-y-2">
                    <div>{currencyFormat(subtotalAmount)}</div>
                    {isDelivery && <div>{currencyFormat(+deliveryFee)}</div>}
                    <div>
                      {currencyFormat(
                        subtotalAmount * taxes + (isDelivery ? fees : 0)
                      )}
                    </div>
                  </div>
                </div>
                {isDelivery && (
                  <div className="space-y-5">
                    <div className="w-full flex justify-between items-center pt-5">
                      <div>Dasher Tip</div>
                      <div>{currencyFormat(subtotalAmount * tipChoice)}</div>
                    </div>

                    <div className="flex flex-col items-center w-full px-4 cursor-pointer">
                      <div className="w-full h-[2rem] flex justify-between items-center rounded-full border bg-gray-200">
                        <div
                          className={`w-1/4 flex justify-center items-center ${
                            tipChoice === 0.15 &&
                            "rounded-full text-white h-full bg-black"
                          }`}
                          onClick={() => {
                            setTipChoice(0.15);
                          }}
                        >
                          15%
                        </div>
                        <div
                          className={`w-1/4 flex justify-center items-center ${
                            tipChoice === 0.2 &&
                            "rounded-full text-white h-full bg-black"
                          }`}
                          onClick={() => setTipChoice(0.2)}
                        >
                          20%
                        </div>
                        <div
                          className={`w-1/4 flex justify-center items-center ${
                            tipChoice === 0.25 &&
                            "rounded-full text-white h-full bg-black"
                          }`}
                          onClick={() => setTipChoice(0.25)}
                        >
                          25%
                        </div>
                        <div
                          className={`w-1/4 flex justify-center items-center ${
                            tipChoice === 0.3 &&
                            "rounded-full text-white h-full bg-black"
                          }`}
                          onClick={() => setTipChoice(0.3)}
                        >
                          30%
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="w-full flex justify-between pt-5">
                  <div>Total</div>
                  <div>{currencyFormat(orderTotal)}</div>
                </div>
                <div
                  className="w-full h-[2.5rem] rounded-full bg-red-600 md:hidden flex justify-between items-center px-4 cursor-pointer"
                  onClick={() => placeOrder()}
                >
                  <div className="text-white font-semibold">Place Order</div>
                  <div className="text-white font-semibold">
                    {currencyFormat(orderTotal)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default CheckoutView;
