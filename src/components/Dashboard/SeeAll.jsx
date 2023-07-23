import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Chickfila from "../../assets/restaurants/chickfila.png";
import Wendys from "../../assets/restaurants/wendys.jpeg";
import Burgerking from "../../assets/restaurants/burgerking.jpeg";
import Jackinthebox from "../../assets/restaurants/jackinthebox.jpeg";
import Togos from "../../assets/restaurants/togos.png";
import Dunkin from "../../assets/restaurants/dunkin.jpeg";
import { AiOutlineStar } from "react-icons/ai";

const SeeAll = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.state) {
      navigate("/");
    }
  }, [location.state, navigate]);

  const [fastest, setFastest] = useState([
    {
      id: 2,
      name: "Togo's",
      src: Togos,
      save: false,
      distance: "1.0 mi",
      time: "20 min",
      fee: "$1.99 Delivery Fee",
      rate: "4.7",
      reviews: "(2,300+)",
    },
    {
      id: 3,
      name: "Dunkin'",
      src: Dunkin,
      save: false,
      distance: "1.0 mi",
      time: "20 min",
      fee: "$1.99 Delivery Fee",
      rate: "4.7",
      reviews: "(2,300+)",
    },
    {
      id: 5,
      name: "Wendy's",
      src: Wendys,
      save: false,
      distance: "1.0 mi",
      time: "20 min",
      fee: "$1.99 Delivery Fee",
      rate: "4.7",
      reviews: "(2,300+)",
    },
    {
      id: 6,
      name: "Burger King",
      src: Burgerking,
      save: false,
      distance: "1.0 mi",
      time: "20 min",
      fee: "$1.99 Delivery Fee",
      rate: "4.7",
      reviews: "(2,300+)",
    },
    {
      id: 4,
      name: "Chick-fil-A",
      src: Chickfila,
      save: false,
      distance: "1.0 mi",
      time: "20 min",
      fee: "$1.99 Delivery Fee",
      rate: "4.7",
      reviews: "(2,300+)",
    },
    {
      id: 7,
      name: "Jack in the Box",
      src: Jackinthebox,
      save: false,
      distance: "1.0 mi",
      time: "20 min",
      fee: "$1.99 Delivery Fee",
      rate: "4.7",
      reviews: "(2,300+)",
    },
  ]);

  const storeView = (id) => {
    navigate("/store", { state: { id: id } });
  };
  return (
    <div className="lg:pt-[5rem] w-screen h-full justify-center items-center sm:px-4">
      <div className="flex flex-row justify-center items-center">
        <div className="px-4 sm:px-0 relative top-5 space-y-6">
          <p className="text-4xl font-bold">{location.state.name}</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 sm:gap-9 gap-4 px-4 md:px-0">
            {location.state.stores.map((store) => (
              <div
                key={store.id}
                className="rounded-lg flex flex-col space-y-3"
                onClick={() => storeView(store.id)}
              >
                <div className="h-[14rem] flex flex-col justify-center">
                  <img
                    alt=""
                    src={store.src}
                    className="rounded-md object-cover relative w-screen h-full md:w-[25rem] md:h-[13rem]"
                  />
                </div>
                <div className="space-y-[-1rem]">
                  <div className="font-semibold relative flex flex-row pb-1">
                    <div className="">{store.name}</div>
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
                  <div className="text-sm pt-[1rem] text-gray-500 relative flex flex-row">
                    {store.distance} • {store.time} • {store.fee}
                  </div>
                  <div className="text-sm pt-[1rem] text-gray-500 relative flex flex-row">
                    {store.rate}
                    <div className="pr-[.4rem]">
                      <AiOutlineStar className="top-[.2rem] relative fill-gray-500" />
                    </div>
                    {store.reviews}
                  </div>
                </div>
                <div className="flex sm:invisible w-full h-[.05rem] relative top-1 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeeAll;
