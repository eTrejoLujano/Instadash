import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TbHeart } from "react-icons/tb";
import { AiOutlineStar } from "react-icons/ai";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";

const StoreOptions = ({ stores, name }) => {
  const ref = useRef(null);
  const [disableButton, setDisableButton] = useState("left");
  const navigate = useNavigate();
  let availableStores = useSelector((state) => state.store.store);
  // useEffect(() => {
  //   if (availableStores) {
  //     availableStores = availableStores.sort((a, b) =>
  //       a.name.localeCompare(b.name)
  //     );

  //     // stores = stores.sort((a, b) => a.name.localeCompare(b.name));
  //     console.log("availableStores", availableStores);
  //     console.log("dashboard stores", stores);
  //   }
  // }, []);

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
  const storeView = (id) => {
    navigate("/store", { state: { id: id } });
  };
  const dashView = ({ stores, name }) => {
    navigate("/dashboard", { state: { stores: stores, name: name } });
  };
  return (
    <div className="h-full flex flex-col pb-2 justify-center items-center space-y-4">
      <div className="flex flex-row w-full lg:w-[75.5rem]">
        <div className="flex justify-between w-full sm:px-0 px-4">
          <h2
            className="font-semibold text-2xl truncate cursor-pointer"
            onClick={() => dashView({ stores: stores, name: name })}
          >
            {name}
          </h2>
          <div className="flex-row justify-center items-center bottom-1 hidden md:flex">
            <div
              className="relative right-6 hidden sm:flex font-semibold text-sm cursor-pointer"
              onClick={() => dashView({ stores: stores, name: name })}
            >
              See All
            </div>
            {disableButton !== "left" && (
              <div className="bottom-[2.2rem]">
                <div
                  className="rounded-full h-8 w-8 border-solid border-2
                  border-gray-100 bg-gray-300"
                >
                  <button
                    className="pl-[.1rem] pt-[.2rem]"
                    onClick={() => adjustView("left")}
                  >
                    <TbChevronLeft size={23} />
                  </button>
                </div>
              </div>
            )}
            {disableButton === "left" && (
              <div className="bottom-[2.2rem]">
                <div
                  className="rounded-full h-8 w-8 border-solid border-2
                  border-gray-100 bg-gray-100"
                >
                  <button
                    className="pl-[.1rem] pt-[.2rem]"
                    onClick={() => adjustView("left")}
                  >
                    <TbChevronLeft size={23} className="text-gray-300" />
                  </button>
                </div>
              </div>
            )}
            {disableButton !== "right" && (
              <div className="bottom-[2.2rem]">
                <div
                  className="rounded-full h-8 w-8 border-solid border-2
                  border-gray-100 bg-gray-300"
                >
                  <button
                    className="pl-[.2rem] pt-[.2rem]"
                    onClick={() => adjustView("right")}
                  >
                    <TbChevronRight size={23} />
                  </button>
                </div>
              </div>
            )}
            {disableButton === "right" && (
              <div className="bottom-[2.2rem]">
                <div
                  className="rounded-full h-8 w-8 border-solid border-2
                  border-gray-100 bg-gray-100"
                >
                  <button
                    className="pl-[.2rem] pt-[.2rem]"
                    onClick={() => adjustView("right")}
                  >
                    <TbChevronRight size={23} className="text-gray-300" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-row w-full lg:w-[75.5rem]">
        <div
          className="flex flex-row w-[75.5rem] overscroll-x-contain overflow-x-scroll
            top-[9rem] container-snap scroll-smooth space-x-[1rem]"
          ref={ref}
          onScroll={handleScroll}
        >
          {stores?.map((store) => (
            <div
              key={store.stores_info.id}
              className="rounded-lg flex flex-col space-y-[-1rem] cursor-pointer"
              onClick={() => storeView(store.stores_info.id)}
            >
              <div className="h-[14rem] w-[24.5rem]">
                <img
                  alt=""
                  src={`../../../${store.stores_info.image}`}
                  className="rounded-md relative w-[30rem] h-[12rem]"
                />
              </div>
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
              {/* <div className="text-sm pt-[1rem] text-gray-500 relative flex flex-row">
                {store.rate}
                <div className="pr-[.4rem]">
                  <AiOutlineStar className="top-[.2rem] relative fill-gray-500" />
                </div>
                {store.reviews}
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoreOptions;
