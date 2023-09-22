import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { TbHeart } from "react-icons/tb";
import { HiArrowNarrowRight } from "react-icons/hi";
import { FaStar } from "react-icons/fa";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";
import { formatAddress, savedStoreCheck } from "../Util/helperFunctions";
import Loading from "../Util/Loading";
import { deleteSaveStore, saveStore } from "../../redux-store/storeSlice";

const StoreOptions = ({ stores, name, currentAddress }) => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const [disableButton, setDisableButton] = useState("left");
  let [mappedStores, setMappedStores] = useState([]);
  let [loading, setLoading] = useState();
  const auth = useSelector((state) => state.auth);
  const restaurants = useSelector((state) => state.store.store);
  const savedStores = useSelector((state) => state.store.savedStores);

  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      let sortedStores = stores.sort((a, b) =>
        a.stores_info.name.localeCompare(b.stores_info.name)
      );
      let storeIndex = 0;
      let restaurantIndex = 0;
      while (
        restaurantIndex < restaurants.length &&
        storeIndex < sortedStores.length
      ) {
        if (
          restaurants[restaurantIndex].name ==
          sortedStores[storeIndex].stores_info.name
        ) {
          mappedStores.push({
            ...restaurants[restaurantIndex],
            ...sortedStores[storeIndex].stores_info,
          });
          storeIndex += 1;
        } else {
          const compare = restaurants[restaurantIndex].name.localeCompare(
            sortedStores[storeIndex].stores_info.name
          );
          if (compare == -1) {
            restaurantIndex += 1;
          } else {
            storeIndex += 1;
          }
        }
      }
      console.log("MAPPED STORES>>>", mappedStores);
      setMappedStores(mappedStores.sort(() => Math.random() - 0.5));
      setLoading(false);
    }
    fetchData();
  }, []);

  function scrollTabbar(element, left) {
    element.scrollTo({
      left,
    });
  }
  function adjustView(position) {
    if (position === "left") {
      scrollTabbar(ref?.current, ref.current.scrollLeft - 1224);
    } else {
      scrollTabbar(ref?.current, ref.current.scrollLeft + 1224);
    }
  }
  const handleScroll = () => {
    if (ref.current) {
      const { scrollLeft, scrollWidth, clientWidth } = ref.current;
      switch (scrollLeft + clientWidth) {
        case clientWidth:
          setDisableButton("left");
          break;
        case scrollWidth:
          setDisableButton("right");
          break;
        default:
          setDisableButton("none");
      }
    }
  };
  const storeView = (id, destinations, place_id, totalRatings) => {
    console.log("PLACE ID", place_id);
    navigate("/store", {
      state: {
        id,
        destinations,
        place_id,
        totalRatings,
        origins: currentAddress.address,
      },
    });
  };
  const dashView = ({ stores, name }) => {
    navigate("/dashboard", { state: { stores, name } });
  };
  if (loading) return <Loading />;
  else if (mappedStores.length > 0)
    return (
      <div className="h-full flex flex-col pb-2 justify-center items-center space-y-4">
        <div className="flex flex-row w-full lg:w-[75.5rem]">
          <div className="flex justify-between w-full sm:px-0 px-4">
            <h2
              className="font-semibold text-2xl truncate cursor-pointer"
              onClick={() => dashView({ stores, name })}
            >
              {name}
            </h2>
            <div className="flex-row justify-center items-center bottom-1 flex">
              <div
                className="relative right-0 md:right-6 font-semibold text-sm cursor-pointer"
                onClick={() => dashView({ stores, name })}
              >
                <div className="hidden md:flex">See All</div>
                <div className="md:hidden flex border rounded-full h-8 w-8 items-center justify-center bg-gray-200">
                  <HiArrowNarrowRight size={23} />
                </div>
              </div>
              <div className="bottom-[2.2rem] hidden md:flex">
                <div
                  className={`rounded-full h-8 w-8 border-solid border-2
                  border-gray-100 ${
                    disableButton === "left"
                      ? "bg-gray-100 opacity-40"
                      : "bg-gray-300 cursor-pointer"
                  }`}
                >
                  <div
                    className="pl-[.1rem] pt-[.2rem]"
                    onClick={() => adjustView("left")}
                  >
                    <TbChevronLeft size={23} />
                  </div>
                </div>
              </div>
              <div className="bottom-[2.2rem] hidden md:flex">
                <div
                  className={`rounded-full h-8 w-8 border-solid border-2
                  border-gray-100 ${
                    disableButton === "right" || mappedStores.length <= 3
                      ? "bg-gray-100 opacity-40"
                      : "bg-gray-300 cursor-pointer"
                  }`}
                >
                  <div
                    className="pl-[.2rem] pt-[.2rem]"
                    onClick={() => adjustView("right")}
                  >
                    <TbChevronRight size={23} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full lg:w-[75.5rem]">
          <div
            className="flex flex-row w-[75.5rem] overscroll-x-contain overflow-x-scroll
            top-[9rem] container-snap scroll-smooth space-x-[1rem] pl-2 md:pl-0"
            ref={ref}
            onScroll={handleScroll}
          >
            {mappedStores.map((store) => {
              // console.log(
              //   "console.log",
              //   savedStoreCheck(savedStores, store.id)
              // );
              return (
                <div
                  key={store.id}
                  className="rounded-lg flex flex-col space-y-[-1rem] cursor-pointer"
                  onClick={() =>
                    storeView(
                      store.id,
                      store.formatted_address,
                      store.place_id,
                      store.user_ratings_total
                    )
                  }
                >
                  <div className="h-[14rem] w-[24.5rem]">
                    <img
                      alt=""
                      src={`../../../${store.image}`}
                      className="rounded-md relative w-[30rem] h-[12rem]"
                    />
                  </div>
                  <div className="w-full flex justify-between">
                    <div>
                      <div className="font-semibold text-base">
                        {store.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {formatAddress(store.formatted_address)[0]}
                      </div>
                      <div className="flex space-x-1">
                        <div className="flex items-center">
                          <div className="text-gray-600 text-sm">
                            {store.rating}
                          </div>
                          <div>
                            <FaStar size={14} className={"fill-gray-600"} />
                          </div>
                        </div>
                        <div className="text-gray-600 text-sm">
                          ({store.user_ratings_total}+ ratings)
                        </div>
                      </div>
                    </div>
                    <div
                    // onClick={(e) => {
                    //   // console.log(
                    //   //   "console.log",
                    //   //   savedStoreCheck(savedStores, store.id)
                    //   // );
                    //   if (savedStoreCheck(savedStores, store.id).length == 0)
                    //     dispatch(
                    //       saveStore({
                    //         user_id: auth.user.user_id,
                    //         store_id: store.id,
                    //       })
                    //     );
                    //   else if (
                    //     savedStoreCheck(savedStores, store.id).length > 0
                    //   ) {
                    //     dispatch(
                    //       deleteSaveStore({
                    //         user_id: auth.user.user_id,
                    //         store_id: store.id,
                    //       })
                    //     );
                    //   }
                    //   e.stopPropagation();
                    // }}
                    >
                      {" "}
                      {/* <TbHeart
                        size={26}
                        className={`${
                          savedStoreCheck(savedStores, store.id).length > 0
                            ? "fill-red-400"
                            : ""
                        } z-40`}
                      /> */}
                    </div>
                  </div>

                  {/* <div className="text-sm pt-[1rem] text-gray-600 relative flex flex-row">
                {store.distance} • {store.time} • {store.fee}
              </div> */}

                  {/* <FaStar className="top-[.2rem] relative fill-gray-600" /> */}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
};

export default StoreOptions;
