import { useState, useEffect, useRef } from "react";
import * as storeAPI from "../../Api/store";

import Togos from "../../assets/store/togos.png";
import TogosLogo from "../../assets/store/logo/togoslogo.png";
import { AiOutlineClockCircle, AiOutlineSearch } from "react-icons/ai";
import { BsFillXCircleFill } from "react-icons/bs";
import FoodItem from "./FoodItem";
import { useLocation, useNavigate } from "react-router-dom";

const StoreView = () => {
  const [searchIcon, setSearchIcon] = useState(true);
  const [store, setStore] = useState();
  const ref = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);
  useEffect(() => {
    if (!location.state) {
      navigate("/");
    }
    async function fetchData() {
      const fetchStore = await storeAPI.getStore({
        store_id: location.state.id,
      });
      setStore(fetchStore);
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
  console.log("stores", store);
  if (!store) {
    return;
  } else {
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
                  <div className=" space-y-3">
                    <span className="font-bold text-4xl relative  items-start">
                      {store[0].name}
                    </span>
                    {/* <p className="text-gray-500 text-sm flex">
                    {store.rate} {store.reviews} {store.distance} $?$?
                  </p> */}
                    <p className="flex relative">
                      <AiOutlineClockCircle
                        className="relative top-[.4rem] text-gray-500"
                        size={13}
                      />
                      Open/close??
                      {/* {dotElemsent}  */}
                      (closing time)
                    </p>
                  </div>
                  <div className="flex sm:flex-row flex-col items-center space-y-2 sm:space-x-2 bottom-[.8rem] relative">
                    <div className="rounded-xl h-[4rem] w-[9rem] flex justify-center border">
                      <div className="flex items-center">
                        <div className="flex-col flex items-center">
                          <div className="text-md">Time</div>
                          <div className="text-sm">delivery time</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex sm:flex-row flex-col items-center">
                      <div className="rounded-full w-[10rem] h-[3rem] border-2 flex justify-between items-center px-3">
                        <div className="text-sm">Delivery</div>
                        <div className="text-sm">Pickup</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full h-[.05rem] rounded bg-gray-200" />
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row md:justify-between items-center space-y-4">
                    <div className="">Full Menu</div>
                    {/* <div className="flex justify-center items-center w-full px-4"> */}
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
                      {/* </div> */}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 gap-1 px-4 md:px-0">
                    {store[0].store_items.map(
                      ({ id, name, description, image, prices }) => (
                        <FoodItem
                          key={id}
                          name={name}
                          description={description}
                          image={image}
                          price={prices}
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
  }
};

export default StoreView;
