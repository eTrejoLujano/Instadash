import { useState, useEffect, useRef } from "react";
import * as pickupAPI from "../../Api/pickup";
import * as storeAPI from "../../Api/store";
import Marker from "./Marker";
import { FaUtensils, FaHome } from "react-icons/fa";
import StoreModal from "./StoreModal";
import { useSelector } from "react-redux";

const Restaurants = ({ map, storeView, itemModal }) => {
  const [hover, setHover] = useState();
  const [pick, setPick] = useState(null);
  const location = useSelector((state) => state.auth.location);
  const restaurants = useSelector((state) => state.store.store);
  console.log("location", location);
  if (location)
    return (
      <div>
        <Marker
          map={map}
          position={{
            lat: +location.latitude,
            lng: +location.longitude,
          }}
        >
          <div
            className="w-7 h-7 bg-black rounded-full flex justify-center items-center
          shadow-sm shadow-gray-400"
          >
            <FaHome size={17} className="text-white" />
          </div>
        </Marker>
        {restaurants &&
          restaurants.map(
            ({
              place_id,
              name,
              geometry,
              opening_hours,
              rating,
              reference,
              formatted_address,
              user_ratings_total,
            }) => (
              <Marker
                map={map}
                key={reference}
                position={geometry.location}
                onClick={() => setPick(!pick ? place_id : null)}
              >
                <div
                  className="w-full flex flex-col items-center relative z-0"
                  onMouseEnter={() => {
                    setHover(place_id);
                  }}
                  onMouseLeave={() => {
                    setHover(null);
                  }}
                >
                  <div
                    className={`w-7 h-7 flex justify-center items-center shadow-sm
               rounded-full bg-white shadow-gray-400 ${
                 hover === place_id && "scale-150"
               }`}
                    onMouseEnter={() => {
                      setHover(place_id);
                    }}
                    onMouseLeave={() => {
                      setHover(null);
                    }}
                  >
                    <FaUtensils size={17} className="text-red-500" />
                  </div>
                  <div className="absolute top-[2rem] z-50">
                    {place_id === pick && (
                      <StoreModal
                        place_id={place_id}
                        name={name}
                        open={opening_hours}
                        rating={rating}
                        origins={location.address}
                        destinations={formatted_address}
                        totalRatings={user_ratings_total}
                        storeView={storeView}
                        itemModal={itemModal}
                      />
                    )}
                  </div>
                </div>
              </Marker>
            )
          )}
      </div>
    );
};

export default Restaurants;
