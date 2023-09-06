import { useRef, useState, useEffect } from "react";
import * as foodtypeAPI from "../../Api/foodtype";
import * as dashboardsAPI from "../../Api/dashboards";
import Filterbar from "./Filterbar";
import Ads from "./Ads";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";
import { AiOutlineStar } from "react-icons/ai";
import { TbHeart } from "react-icons/tb";
import StoreOptions from "./StoreOptions";
import Categories from "../Category/Catogories";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { availableStores } from "../../redux-store/storeSlice";
import { formatAddress } from "../Util/helperFunctions";
import Loading from "../Util/Loading";

const UserHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef(null);
  const [dashboard, setDashboard] = useState();
  const [disableButton, setDisableButton] = useState("left");
  const [foodTypes, setFoodTypes] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [foodPick, setFoodPick] = useState(null);
  let [typeStores, setTypeStores] = useState([]);
  const [loading, setLoading] = useState();
  const restaurants = useSelector((state) => state.store.store);
  const currentAddress = useSelector((state) => state.auth.location);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const dashboards = await dashboardsAPI.getDashboards();
      const foodType = await foodtypeAPI.getFoodType();
      setDashboard(dashboards);
      setFoodTypes(foodType);
      await dispatch(
        availableStores({
          latitude: currentAddress.latitude,
          longitude: currentAddress.longitude,
        })
      ).unwrap();
      setLoading(false);
    }
    fetchData();
  }, [currentAddress, dispatch]);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setTypeStores([]);
      setFoodPick(searchParams.get("foodtype"));
      if (foodPick && restaurants) {
        const foodTypePick = await foodtypeAPI.getFoodPick({
          foodtype_name: foodPick,
        });
        let sortedStores = foodTypePick[0]?.store_foodtype.sort((a, b) =>
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
            typeStores.push({
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
      }
      setTypeStores(typeStores);
      setLoading(false);
    }
    fetchData();
  }, [foodPick, searchParams, restaurants]);
  function scrollTabbar(element, left) {
    element.scrollTo({
      left,
    });
  }
  function adjustView(position) {
    if (position === "left") {
      scrollTabbar(ref?.current, 0);
    } else {
      scrollTabbar(ref?.current, ref.current?.scrollWidth);
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
  const foodTypePicked = (name, id) => {
    setFoodPick(id);
    navigate(`/?foodtype=${name}`);
  };
  console.log("loading", loading);
  if (loading) return <Loading />;
  else
    return (
      <div className="md:top-[0rem] top-[8rem] relative w-screen">
        <Categories />
        <div className="h-full text-black">
          <div className="flex flex-row justify-center md:space-x-5">
            <div className="hidden md:flex">
              {disableButton !== "left" && (
                <div className="py-[2rem]">
                  <div className="rounded-full h-8 w-8 shadow shadow-gray-300">
                    <button
                      className="pl-[.2rem] pt-[.3rem]"
                      onClick={() => adjustView("left")}
                    >
                      <TbChevronLeft size={23} />
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div
              className="flex flex-row
       w-[70rem] overscroll-x-contain overflow-x-scroll pl-3
       top-[9rem] container-snap scroll-smooth"
              ref={ref}
              onScroll={handleScroll}
            >
              {foodTypes?.map(({ id, name, image }) => (
                <div
                  key={id}
                  className="flex flex-col items-center justify-center
              py-4 cursor-pointer space-y-[.4rem] px-4"
                  onClick={() => foodTypePicked(name, id)}
                >
                  <div
                    className={`w-[3rem] h-[3rem] hover:bg-red-400 ${
                      foodPick == name && "bg-red-400"
                    } rounded-full flex items-center justify-center `}
                  >
                    <img
                      className="relative w-9 h-9"
                      src={`../../../${image}`}
                    />
                  </div>
                  <div className="truncate text-sm top-[.5rem] relative items-center ">
                    {name}
                  </div>
                </div>
              ))}
            </div>
            <div className="hidden md:flex">
              {disableButton !== "right" && (
                <div className="py-[2rem] ">
                  <div
                    className="rounded-full h-8 w-8 shadow
                  shadow-gray-300"
                  >
                    <button
                      className="pl-[.4rem] pt-[.3rem]"
                      onClick={() => adjustView("right")}
                    >
                      <TbChevronRight size={23} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {!foodPick && restaurants && currentAddress && (
          <>
            <Ads />
            <div className="space-y-5 pt-1">
              {dashboard?.map((dashboard) => (
                <StoreOptions
                  key={dashboard.id}
                  stores={dashboard.store_dashboard}
                  name={dashboard.name}
                  restaurants={restaurants}
                  currentAddress={currentAddress}
                />
              ))}
            </div>
          </>
        )}
        {foodPick && (
          <div className="w-screen h-full ">
            <div className="flex flex-row justify-center items-center">
              <div className="px-4 md:px-8 lg:px-12 relative top-7 space-y-6 md:space-y-10 w-[76rem]">
                <div
                  className={`grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 sm:gap-8 gap-4 px-4 md:px-0 ${
                    loading ? "bg-gray-100 opacity-25" : ""
                  }`}
                >
                  {typeStores.map((store) => (
                    <div
                      key={store.id}
                      className="rounded-lg flex flex-col space-y-3 max-h-full"
                      onClick={() =>
                        storeView(
                          store.id,
                          store.formatted_address,
                          store.place_id,
                          store.user_ratings_total
                        )
                      }
                    >
                      <div className="h-[12rem] flex flex-col justify-center">
                        <img
                          alt=""
                          src={`../../../${store.image}`}
                          className="rounded-md object-cover relative w-full h-full"
                        />
                      </div>
                      <div className="w-full flex justify-between">
                        <div>
                          <div className="font-semibold text-base">
                            {store.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {formatAddress(store.formatted_address)[0]}
                          </div>
                          <div className="flex space-x-1">
                            <div className="flex items-center">
                              <div className="text-gray-500 text-sm">
                                {store.rating}
                              </div>
                              <div>
                                <AiOutlineStar
                                  size={14}
                                  className={"fill-gray-500"}
                                />
                              </div>
                            </div>
                            <div className="text-gray-500 text-sm">
                              ({store.user_ratings_total}+ reviews)
                            </div>
                          </div>
                        </div>
                        <div>
                          {" "}
                          <TbHeart size={26} className={"fill-red-400"} />
                        </div>
                      </div>
                      <div className="flex sm:invisible w-full h-[.05rem] relative top-1 rounded bg-gray-200" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {/* <Filterbar /> */}
      </div>
    );
};

export default UserHome;
