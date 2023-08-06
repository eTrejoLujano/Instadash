import { useState, useEffect } from "react";
import Krispy from "../../assets/ads/krispykreme.jpg";
import Tacobell from "../../assets/ads/tacobell.jpeg";
import Coke from "../../assets/ads/cokecola.png";
import Extra from "../../assets/ads/extra.jpg";
import * as adsAPI from "../../Api/ads";

const Ads = () => {
  const [ads, setAds] = useState([
    {
      id: 1,
      title: "Save $5 with a Coca-Cola Zero Sugar. On orders $20+",
      src: Coke,
      description: "DashPass Deals. Code: MAGICMEALS",
      button: "Order Now",
      style: "bg-black",
      style2: "border-black",
      buttonStyle: "bg-red-500",
    },
    {
      id: 2,
      title: "30% off Krispy Kreme Classic Assorted Dozen",
      src: Krispy,
      description: "Up to $7 off. Now - 5/31",
      button: "Order Now",
      style: "bg-green-900",
      style2: "border-green-900",
      buttonStyle: "bg-green-600",
    },
    {
      id: 3,
      title: "Doing too much? Refresh & relax with Extra Refreshers",
      src: Extra,
      description: "Available at select convenience and grocery stores",
      button: "Order Now",
      style: "bg-blue-900",
      style2: "border-blue-900",
      buttonStyle: "bg-blue-400",
    },
    {
      id: 4,
      title: "Get $3 off your next breakfast order of $15+ at Taco Bell",
      src: Tacobell,
      description: "From 5am - 11am. Now - 5/14",
      button: "Order Now",
      style: "bg-purple-800",
      style2: "border-purple-800",
      buttonStyle: "bg-purple-400",
    },
  ]);

  // useEffect(() => {
  //   async function fetchData() {
  //     // setLoading(true);
  //     const fetchAds = await adsAPI.getAds();
  //     console.log(fetchAds["ads"]);
  //     setAds(fetchAds["ads"]);
  //     // setLoading(false);
  //   }
  //   fetchData();
  // }, []);

  return (
    <div className="h-[12rem] flex flex-col ">
      <div className="flex flex-row justify-center">
        <div
          className="flex flex-row w-[75.5rem] overscroll-x-contain overflow-x-scroll
            top-[9rem] container-snap scroll-smooth space-x-[14rem]"
          // ref={ref}
          // onScroll={handleScroll}
        >
          {ads.map((ad) => (
            <div key={ad.id} className="rounded-lg flex flex-col">
              <div
                className={
                  "rounded-md box-content h-38 w-[24.2rem] relative z-20" +
                  " " +
                  ad.style
                }
              >
                <div
                  className={
                    "w-0 h-0 relative border-l-transparent border-t-[167px] border-r-[68px] border-r-transparent pl-[12.1rem] left-[12rem] z-20" +
                    " " +
                    ad.style2
                  }
                >
                  <>
                    <p className="bottom-[9.5rem] w-[18rem] text-lg font-semibold relative text-white right-[23rem] flex">
                      {ad.title}
                    </p>
                    <p className="bottom-[9rem] w-[18rem] text-sm relative text-white right-[23rem] flex">
                      {ad.description}
                    </p>

                    <button
                      className={
                        "rounded-full text-sm font-semibold relative bottom-[8.5rem] right-[23rem] truncate cursor-pointer w-[6rem] h-[2rem] text-white" +
                        " " +
                        ad.buttonStyle
                      }
                    >
                      Order Now
                    </button>
                  </>
                </div>
              </div>
              <img
                alt=""
                src={ad.src}
                className="relative left-[24rem] top-[-10.41rem] rounded-md h-[10.38rem] w-52"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ads;
