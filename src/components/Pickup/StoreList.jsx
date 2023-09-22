import { useEffect } from "react";
import { useSelector } from "react-redux";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FaStar } from "react-icons/fa";

import { TbHeart } from "react-icons/tb";
import { currencyFormat } from "../Util/helperFunctions";

export const StoreList = ({ storeView, itemModal }) => {
  const auth = useSelector((state) => state.auth);
  const store = useSelector((state) => state.store.store);
  const buttonStyling =
    "w-1/2 h-[2.9rem] font-medium text-sm rounded-full flex justify-center items-center border border-gray-200 hover:bg-gray-200";
  return (
    <div className="md:py-7 pt-7 pb-12 md:pb-0 h-full w-full overflow-y-scroll overscroll-y-contain container-snap ">
      <div className="text-xl font-bold px-7">All Stores</div>
      <div className="pt-2 divide-y-[.1rem] divide-gray-200 h-full w-full">
        {store &&
          store.map(
            ({
              id,
              place_id,
              name,
              expensive_rating,
              formatted_address,
              opening_hours,
              store_items,
              rating,
              user_ratings_total,
            }) => (
              <div
                key={place_id}
                className="w-full h-fit pb-5"
                onClick={() =>
                  storeView({
                    id,
                    origins: auth.location.address,
                    destinations: formatted_address,
                    totalRatings: user_ratings_total,
                    isDelivery: true,
                    place_id,
                  })
                }
              >
                <div className="px-7 py-3">
                  <div className="flex items-center space-x-1">
                    <div className="text-lg font-semibold">{name}</div>
                    <div>{/* <TbHeart size={23} /> */}</div>
                  </div>
                  <div>
                    <div className="flex items-center space-x-1 text-sm">
                      <AiOutlineClockCircle />
                      <div
                        className={`${
                          opening_hours?.open_now
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {opening_hours?.open_now ? "Open" : "Closed"}
                      </div>
                      <div>•</div>
                      <div className="flex items-center">
                        <FaStar />
                        {rating}
                      </div>
                      <div>({user_ratings_total}+ ratings)</div>
                      <div>•</div>
                      <div>{expensive_rating}</div>
                    </div>
                    <div></div>
                  </div>
                  <div className="line-clamp-1 text-sm">
                    {formatted_address}
                  </div>
                </div>
                <div
                  className="flex flex-row w-full h-full overscroll-x-contain overflow-x-scroll
           container-snap scroll-smooth space-x-[1rem] overflow-y-contain pl-5"
                >
                  {store_items.map(
                    ({ id, name, image, prices, description }) => (
                      <div
                        key={id}
                        onClick={(e) => {
                          itemModal({
                            id,
                            name,
                            image,
                            description,
                            place_id,
                            price: prices,
                          });
                          e.stopPropagation();
                        }}
                      >
                        <div className="max-h-fit w-[8rem] flex justify-center">
                          <img
                            alt=""
                            src={`../../../${image}`}
                            className="rounded-md relative w-[7rem] h-[7rem] object-cover"
                          />
                        </div>
                        <div className="text-xs line-clamp-2 ">{name}</div>
                        <div className="text-xs">{currencyFormat(+prices)}</div>
                      </div>
                    )
                  )}
                </div>
                <div className="flex justify-between px-5 space-x-4 pt-3">
                  <button
                    onClick={(e) => {
                      storeView({
                        id,
                        origins: auth.location.address,
                        destinations: formatted_address,
                        totalRatings: user_ratings_total,
                        place_id,
                      });
                      e.stopPropagation();
                    }}
                    className={buttonStyling}
                  >
                    Delivery
                  </button>
                  <button className={buttonStyling}>Pickup</button>
                </div>
              </div>
            )
          )}
      </div>
    </div>
  );
};
