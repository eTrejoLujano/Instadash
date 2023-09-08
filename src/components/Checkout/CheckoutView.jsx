import { useState, useEffect } from "react";
import DashedEats from "../../assets/icons/instadash.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import * as pickupAPI from "../../Api/pickup";
import * as storeAPI from "../../Api/store";
import { currencyFormat, formatAddress } from "../Util/helperFunctions";
import StoreMapWrapper from "../Store/StoreMapWrapper";
import { FaStoreAlt, FaRegCreditCard } from "react-icons/fa";
import { AiOutlineClockCircle } from "react-icons/ai";
import { RxHome } from "react-icons/rx";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import AddressModal from "../NavbarFeatures/AddressModal";
import Loading from "../Util/Loading";

const CheckoutView = () => {
  let [isDelivery, setIsDelivery] = useState(true);
  let [tipChoice, setTipChoice] = useState(".2");
  let [travelInfo, setTravelInfo] = useState();
  let [storeInfo, setStoreInfo] = useState();
  let [items, setItems] = useState();
  const [addressModal, setAddressModal] = useState(false);
  const [taxesAndFees, setTaxesAndFees] = useState();
  const [deliveryFee, setDeliveryFee] = useState("5.99");
  const auth = useSelector((state) => state.auth);
  const location = useLocation();
  useEffect(() => {
    console.log(location.state.cartInfo);
    async function fetchData() {
      if (auth.location) {
        const travel = await pickupAPI.getDistance({
          destinations: location.state.cartInfo.address,
          origins: auth.location.address,
        });
        const storeInfo = await storeAPI.getStoreByName({
          store_name: location.state.cartInfo.name,
        });
        setStoreInfo(storeInfo);
        setTravelInfo(travel.rows[0].elements[0]);
        setTaxesAndFees(
          location.state.cartInfo.total * 0.0975 + (isDelivery ? 3 : 0)
        );
        console.log("travelInfo: ", travelInfo);

        console.log("storeInfo: ", storeInfo);
      }
    }
    fetchData();
  }, [isDelivery]);

  const handleClose = () => {
    setAddressModal(false);
  };
  if (!travelInfo) return <Loading />;
  else
    return (
      <div>
        {addressModal && <AddressModal handleClose={handleClose} />}
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
            <div className="w-full lg:w-[40rem] h-[2.5rem] rounded-full bg-red-600 hidden md:flex justify-between items-center px-4">
              <div className="text-white font-semibold">Place Order</div>
              <div className="text-white font-semibold">
                {currencyFormat(
                  location.state.cartInfo.total +
                    (isDelivery ? +deliveryFee : 0) +
                    +taxesAndFees +
                    (isDelivery
                      ? (location.state.cartInfo.total +
                          +deliveryFee +
                          +taxesAndFees) *
                        +tipChoice
                      : 0)
                )}
              </div>
            </div>
          </div>
          <div className="w-full md:w-[25rem] h-fit md:h-full">
            <div className="w-full md:w-[25rem] px-4 md:px-8 md:py-8 md:h-full space-y-6">
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
                  <div className="w-full h-[2.5rem] rounded-full bg-red-600 hidden md:flex justify-between items-center px-4">
                    <div className="text-white font-semibold">Place Order</div>
                    <div className="text-white font-semibold">
                      {currencyFormat(
                        location.state.cartInfo.total +
                          (isDelivery ? +deliveryFee : 0) +
                          +taxesAndFees +
                          (isDelivery
                            ? (location.state.cartInfo.total +
                                +deliveryFee +
                                +taxesAndFees) *
                              +tipChoice
                            : 0)
                      )}
                    </div>
                  </div>
                  <div className="w-full h-fit pt-5 flex justify-between items-center">
                    <div>Order Summary</div>
                    <div>
                      <MdOutlineArrowForwardIos
                        className="text-gray-700"
                        size={16}
                      />
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
                    <div>{currencyFormat(location.state.cartInfo.total)}</div>
                    {isDelivery && <div>{currencyFormat(+deliveryFee)}</div>}
                    <div>{currencyFormat(+taxesAndFees)}</div>
                  </div>
                </div>
                {isDelivery && (
                  <div className="space-y-5">
                    <div className="w-full flex justify-between items-center pt-5">
                      <div>Dasher Tip</div>
                      <div>
                        {currencyFormat(
                          (location.state.cartInfo.total +
                            +deliveryFee +
                            +taxesAndFees) *
                            +tipChoice
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-center w-full px-4 cursor-pointer">
                      <div className="w-full h-[2rem] flex justify-between items-center rounded-full border bg-gray-200">
                        <div
                          className={`w-1/4 flex justify-center items-center ${
                            tipChoice === ".15" &&
                            "rounded-full text-white h-full bg-black"
                          }`}
                          onClick={() => {
                            setTipChoice(".15");
                          }}
                        >
                          15%
                        </div>
                        <div
                          className={`w-1/4 flex justify-center items-center ${
                            tipChoice === ".2" &&
                            "rounded-full text-white h-full bg-black"
                          }`}
                          onClick={() => setTipChoice(".2")}
                        >
                          20%
                        </div>
                        <div
                          className={`w-1/4 flex justify-center items-center ${
                            tipChoice === ".25" &&
                            "rounded-full text-white h-full bg-black"
                          }`}
                          onClick={() => setTipChoice(".25")}
                        >
                          25%
                        </div>
                        <div
                          className={`w-1/4 flex justify-center items-center ${
                            tipChoice === ".3" &&
                            "rounded-full text-white h-full bg-black"
                          }`}
                          onClick={() => setTipChoice(".3")}
                        >
                          30%
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="w-full flex justify-between pt-5">
                  <div>Total</div>
                  <div>
                    {currencyFormat(
                      location.state.cartInfo.total +
                        (isDelivery ? +deliveryFee : 0) +
                        +taxesAndFees +
                        (isDelivery
                          ? (location.state.cartInfo.total +
                              +deliveryFee +
                              +taxesAndFees) *
                            +tipChoice
                          : 0)
                    )}
                  </div>
                </div>
                <div className="w-full h-[2.5rem] rounded-full bg-red-600 md:hidden flex justify-between items-center px-4">
                  <div className="text-white font-semibold">Place Order</div>
                  <div className="text-white font-semibold">
                    {currencyFormat(
                      location.state.cartInfo.total +
                        (isDelivery ? +deliveryFee : 0) +
                        +taxesAndFees +
                        (isDelivery
                          ? (location.state.cartInfo.total +
                              +deliveryFee +
                              +taxesAndFees) *
                            +tipChoice
                          : 0)
                    )}
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
