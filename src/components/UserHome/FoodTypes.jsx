import { useRef, useState, useEffect } from "react";
import * as foodtypeAPI from "../../Api/foodtype";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";

const FoodTypes = () => {
  const ref = useRef(null);
  const [disableButton, setDisableButton] = useState("left");
  const [foodType, setFoodType] = useState();

  useEffect(() => {
    async function fetchData() {
      const foodTypes = await foodtypeAPI.getFoodType();
      setFoodType(foodTypes);
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
  return (
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
       w-[75.5rem] overscroll-x-contain overflow-x-scroll pl-3
       top-[9rem] right-[15rem] container-snap scroll-smooth space-x-[2.2rem]"
          ref={ref}
          onScroll={handleScroll}
        >
          {foodType?.map(({ id, name, image }) => (
            <div
              key={id}
              className="flex mx-auto flex-col justify-center items-center 
             space-y-2 py-4 pr-[.5rem] cursor-pointer"
            >
              <div className="w-9 h-9">
                <img className="relative" src={image} />
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
  );
};

export default FoodTypes;
