import { useRef, useState, useEffect } from "react";
import * as foodtypeAPI from "../../Api/foodtype";
import * as dashboardsAPI from "../../Api/dashboards";
import FoodTypes from "./FoodTypes";
import Filterbar from "./Filterbar";
import Ads from "./Ads";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";
import StoreOptions from "./StoreOptions";
import Categories from "../Category/Catogories";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import FoodTypePick from "../FoodType/FoodTypePick";

const UserHome = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const [dashboard, setDashboard] = useState();
  const [disableButton, setDisableButton] = useState("left");
  const [foodTypes, setFoodTypes] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [foodPick, setFoodPick] = useState(null);
  const [typeStores, setTypeStores] = useState(null);
  const [loading, setLoading] = useState(false);
  const restaurants = useSelector((state) => state.store.store);
  const currentAddress = useSelector((state) => state.auth.location);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const dashboards = await dashboardsAPI.getDashboards();
      const foodType = await foodtypeAPI.getFoodType();
      setDashboard(dashboards);
      setFoodTypes(foodType);
      setFoodPick(searchParams.get("foodtype"));

      if (foodPick) {
        const foodTypePick = await foodtypeAPI.getFoodPick({
          foodtype_name: foodPick,
        });
        setTypeStores(foodTypePick[0]?.store_foodtype);
      }
      setLoading(false);
    }
    fetchData();
  }, [searchParams, foodPick]);
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
  const storeView = (id) => {
    navigate("/store", { state: { id: id } });
  };
  const foodTypePicked = (name, id) => {
    setFoodPick(id);
    navigate(`/?foodtype=${name}`);
  };
  return (
    <div>
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
                  <img className="relative w-9 h-9" src={`../../../${image}`} />
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
      {!foodPick && restaurants && currentAddress ? (
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
      ) : (
        <div className="w-screen h-full ">
          <div className="flex flex-row justify-center items-center">
            <div className="px-4 md:px-8 lg:px-12 relative top-7 space-y-6 md:space-y-10 w-[76rem]">
              <div
                className={`grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 sm:gap-8 gap-4 px-4 md:px-0 ${
                  loading ? "bg-gray-100 opacity-25" : ""
                }`}
              >
                {typeStores?.map((store) => (
                  <div
                    key={store.stores_info.id}
                    className="rounded-lg flex flex-col space-y-3 max-h-full"
                    onClick={() => storeView(store.stores_info.id)}
                  >
                    <div className="h-[12rem] flex flex-col justify-center">
                      <img
                        alt=""
                        src={`../../../${store.stores_info.image}`}
                        className="rounded-md object-cover relative w-full h-full"
                      />
                    </div>
                    <div className="space-y-[-1rem]">
                      <div className="font-semibold relative flex flex-row pb-1">
                        <div className="">{store.stores_info.name}</div>
                        <button
                          className="absolute right-[.6rem] z-20"
                          // onClick={async () => handleSave(store.id)}
                        >
                          {/* <TbHeart
                  size={26}
                  className={store.save ? "fill-red-400" : ""}
                /> */}
                        </button>
                      </div>
                      {/* <div className="text-sm pt-[1rem] text-gray-500 relative flex flex-row">
                    {store.distance} • {store.time} • {store.fee}
                  </div> */}
                      <div className="text-sm pt-[1rem] text-gray-500 relative flex flex-row">
                        {/* {store.rate} */}
                        {/* <div className="pr-[.4rem]">
                      <AiOutlineStar className="top-[.2rem] relative fill-gray-500" />
                    </div> */}
                        {/* {store.reviews} */}
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
