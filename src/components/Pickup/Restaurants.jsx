import { useState, useEffect, useRef } from "react";
import * as pickupAPI from "../../Api/pickup";
import Marker from "./Marker";
import { FaUtensils, FaHome } from "react-icons/fa";
import StoreModal from "./StoreModal";
import { useSelector } from "react-redux";

const Restaurants = ({ map }) => {
  const [restuarants, setRestaurants] = useState();
  const [hover, setHover] = useState();
  const [pick, setPick] = useState(null);
  const geometry2 = useSelector((state) => state.auth.location);
  useEffect(() => {
    async function fetchData() {
      const restaurantsOptions = await pickupAPI.getRestaurants({
        lat: +geometry2.latitude,
        lng: +geometry2.longitude,
      });
      const fastfoodOptions = await pickupAPI.getFastFood({
        lat: +geometry2.latitude,
        lng: +geometry2.longitude,
      });
      const coffeeOptions = await pickupAPI.getCoffee({
        lat: +geometry2.latitude,
        lng: +geometry2.longitude,
      });
      const pizzaOptions = await pickupAPI.getPizza({
        lat: +geometry2.latitude,
        lng: +geometry2.longitude,
      });
      console.log([
        ...restaurantsOptions.results,
        ...fastfoodOptions.results,
        ...coffeeOptions.results,
        ...pizzaOptions.results,
      ]);
      setRestaurants([
        ...restaurantsOptions.results,
        ...fastfoodOptions.results,
        ...coffeeOptions.results,
        ...pizzaOptions.results,
      ]);
    }
    fetchData();
  }, []);
  console.log("marker ref", pick);
  console.log("geometry", geometry2);
  if (!restuarants) {
    return;
  } else {
    return (
      <div>
        <Marker
          map={map}
          position={{
            lat: +geometry2.latitude,
            lng: +geometry2.longitude,
          }}
        >
          <div
            className="w-7 h-7 bg-black rounded-full flex justify-center items-center
          shadow-sm shadow-gray-400"
          >
            <FaHome size={17} className="text-white" />
          </div>
        </Marker>
        {restuarants.map(
          ({
            place_id,
            name,
            geometry,
            opening_hours,
            rating,
            reference,
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
                      name={name}
                      open={opening_hours}
                      rating={rating}
                      totalRatings={user_ratings_total}
                    />
                  )}
                </div>
              </div>
            </Marker>
          )
        )}
      </div>
    );
  }
};

export default Restaurants;
