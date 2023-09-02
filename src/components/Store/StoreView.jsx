import { useState, useEffect, useRef } from "react";
import * as storeAPI from "../../Api/store";
import * as pickupAPI from "../../Api/pickup";
import FoodItem from "./FoodItem";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineClockCircle, AiOutlineSearch } from "react-icons/ai";
import { BsFillXCircleFill } from "react-icons/bs";
import { AiOutlineStar, AiFillCar } from "react-icons/ai";
import StoreMapWrapper from "./StoreMapWrapper";
import { formatAddress } from "../Util/helperFunctions";

const StoreView = () => {
  const ref = useRef(null);
  const [searchIcon, setSearchIcon] = useState(true);
  const [store, setStore] = useState();
  const [totalRatings, setTotalRatings] = useState();
  const [distance, setDistance] = useState();
  const [placeDetails, setPlaceDetails] = useState();
  const [isDelivery, setIsDelivery] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!location.state) {
      navigate("/");
    }
    async function fetchData() {
      if (location.state.id) {
        const fetchStore = await storeAPI.getStoreById({
          store_id: location.state.id,
        });
        console.log(
          "destinations, origins",
          location.state.destinations,
          location.state.origins
        );
        const travel = await pickupAPI.getDistance({
          destinations: location.state.destinations,
          origins: location.state.origins,
        });
        const placeDetails = await pickupAPI.getPlaceDetails({
          place_id: location.state.place_id,
        });
        setStore(fetchStore);
        setTotalRatings(totalRatings);
        setDistance(travel.rows[0].elements[0]);
        setPlaceDetails(placeDetails.result);
        setIsDelivery(false);
      }
      if (location.state.name) {
        const fetchStore = await storeAPI.getStoreByName({
          store_name: location.state.name,
        });
        setStore(fetchStore);
        setTotalRatings(location.state.totalRatings);
        setDistance(location.state.distance);
        setPlaceDetails(location.state.details);
        setIsDelivery(location.state.pickup);
      }
    }
    fetchData();
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setSearchIcon(true);
    }
  };
  const onClear = () => {
    ref.current.value = "";
    setSearchIcon(true);
  };
  console.log("place details", placeDetails);
  if (!store) return;
  else
    return (
      <div className="lg:pt-[5rem] w-screen sm:px-4">
        <div className="flex flex-row justify-center">
          <div className="flex flex-col items-center w-[56rem]">
            <div className="">
              <img
                src={`../../../${store[0].image}`}
                className="sm:rounded-[20px] object-cover h-[15.7rem] w-[56rem]"
              />
              <div className="relative bottom-6 sm:bottom-0">
                <div className="bottom-[2.8rem] items-start relative pl-4">
                  <img
                    src={store[0].logo}
                    className="h-[6rem] w-[6rem] object-contain rounded-full border-2 border-white bg-white shadow-lg shadow-gray-400"
                  />
                </div>
              </div>
              <div className="px-4 sm:px-0 relative bottom-1 w-full">
                <div className="flex justify-between bottom-[1.8rem] relative">
                  <div className="space-y-3">
                    <span className="font-bold text-4xl relative  items-start">
                      {store[0].name}
                    </span>
                    <p className="text-gray-500 text-sm flex space-x-[.4rem]">
                      <div className="flex items-center space-x-[.2rem]">
                        <div>{placeDetails.rating}</div>
                        <AiOutlineStar className="fill-gray-500" />
                        <div className="flex space-x-[.2rem]">
                          <div>{totalRatings}</div>
                          <div>ratings</div>
                        </div>
                      </div>
                      <div>•</div>
                      <div>{distance.distance.text}</div> <div>•</div>{" "}
                      <div>{store[0].expensive_rating}</div>
                    </p>
                    <p className="flex relative items-center space-x-[.4rem]">
                      <AiOutlineClockCircle
                        className="relative text-gray-500"
                        size={13}
                      />
                      {placeDetails.opening_hours.open_now ? (
                        <div className="text-green-500 text-sm">Open</div>
                      ) : (
                        <div className="text-red-500 text-sm">Closed</div>
                      )}
                      <div className="text-sm text-gray-500">
                        {
                          placeDetails.opening_hours.weekday_text[
                            new Date().getDay() - 1
                          ]
                        }
                      </div>
                    </p>
                  </div>
                  <div className="flex sm:flex-row flex-col items-center space-y-2 sm:space-x-2 bottom-[.8rem] relative">
                    <div className="rounded-xl h-[4rem] w-[9rem] flex justify-center border">
                      <div className="flex items-center">
                        <div className="flex-col flex items-center">
                          <div className="text-md font-bold">
                            {Math.floor((distance.duration.value + 720) / 60)}{" "}
                            min
                          </div>
                          <div className="text-sm text-gray-500">
                            delivery time
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex sm:flex-row flex-col items-center">
                      <div className="rounded-full w-[10rem] h-[3rem] border-2 bg-gray-300 flex justify-between items-center">
                        <div
                          className={`flex flex-col w-1/2 items-center justify-center h-full rounded-full cursor-pointer ${
                            isDelivery
                              ? "bg-gray text-black"
                              : "bg-black text-white"
                          } `}
                          onClick={() => setIsDelivery(false)}
                        >
                          <div className="text-sm font-semibold">Delivery</div>
                          <div className="text-xs">
                            {" "}
                            {Math.floor(
                              (distance.duration.value + 720) / 60
                            )}{" "}
                            min
                          </div>
                        </div>
                        <div
                          className={`flex flex-col w-1/2 items-center justify-center text-sm h-full rounded-full cursor-pointer ${
                            isDelivery
                              ? "bg-black text-white "
                              : "bg-gray text-black "
                          }`}
                          onClick={() => setIsDelivery(true)}
                        >
                          <div className="text-sm font-semibold">Pickup</div>
                          <div className="text-xs">
                            {" "}
                            {distance.duration.text}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {isDelivery && (
                  <div className="w-full flex pb-5 space-x-5">
                    <StoreMapWrapper
                      lat={placeDetails.geometry.location.lat}
                      lng={placeDetails.geometry.location.lng}
                    />
                    <div className="w-[14rem] h-[8rem] flex flex-col items-center justify-center">
                      <div className="text-base font-semibold">
                        Pick up this order at:
                      </div>
                      <div className="text-base underline">
                        {formatAddress(placeDetails.formatted_address)[0]}
                      </div>
                      <div className="text-sm flex items-center space-x-1">
                        <div>
                          <AiFillCar size={15} />
                        </div>
                        <div>{distance.duration.text}</div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="w-full h-[.05rem] rounded bg-gray-200" />
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row md:justify-between items-center space-y-4">
                    <div className="">Full Menu</div>
                    <div className="relative md:w-[20rem] w-full bottom-2">
                      <div className="absolute text-gray-500 top-2 left-2">
                        <AiOutlineSearch size={24} />
                      </div>
                      {!searchIcon && (
                        <button className="absolute text-gray-500 top-[.6rem] left-[17.6rem]">
                          <BsFillXCircleFill size={21} onClick={onClear} />
                        </button>
                      )}
                      <input
                        type="text"
                        className="rounded-full block py-2 px-10 text-sm w-full h-[2.6rem] border border-gray-100 bg-gray-100 focus:ring-black text-black"
                        ref={ref}
                        placeholder="Search store menu"
                        onClick={() => setSearchIcon(false)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 gap-1 px-4 md:px-0">
                    {store[0].store_items.map(
                      ({ id, name, description, image, prices }) => (
                        <FoodItem
                          key={id}
                          itemId={id}
                          name={name}
                          description={description}
                          image={image}
                          price={prices}
                          place_id={location.state.place_id}
                        />
                      )
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

export default StoreView;
