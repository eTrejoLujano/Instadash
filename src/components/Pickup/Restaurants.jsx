import { useState, useEffect, useRef } from "react";
import * as pickupAPI from "../../Api/pickup";
import * as storeAPI from "../../Api/store";
import Marker from "./Marker";
import { FaUtensils, FaHome } from "react-icons/fa";
import StoreModal from "./StoreModal";
import { useSelector } from "react-redux";

const Restaurants = ({ map, storeView }) => {
  const [restuarants, setRestaurants] = useState();
  const [hover, setHover] = useState();
  const [pick, setPick] = useState(null);
  const geometry2 = useSelector((state) => state.auth.location);
  useEffect(() => {
    async function fetchData() {
      let availableStores = await storeAPI.getAllStores();
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
      availableStores = availableStores.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      let allRestaurants = [
        ...restaurantsOptions.results,
        ...fastfoodOptions.results,
        ...coffeeOptions.results,
        ...pizzaOptions.results,
      ];
      allRestaurants = allRestaurants.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      console.log(
        "available stores, restaurants",
        availableStores,
        allRestaurants
      );
      let mappedStores = [];
      let storeIndex = 0;
      let restaurantIndex = 0;
      while (
        (storeIndex < availableStores.length &&
          restaurantIndex < allRestaurants.length) ||
        restaurantIndex == allRestaurants.length
      ) {
        if (
          availableStores[storeIndex].name ==
          allRestaurants[restaurantIndex].name
        ) {
          mappedStores.push(allRestaurants[restaurantIndex]);
          restaurantIndex += 1;
        }
        if (
          availableStores[storeIndex].name !==
          allRestaurants[restaurantIndex].name
        ) {
          const compare = availableStores[storeIndex].name.localeCompare(
            allRestaurants[restaurantIndex].name
          );
          if (compare == -1) {
            storeIndex += 1;
          } else {
            restaurantIndex += 1;
          }
        }
      }
      console.log("mapped stores", mappedStores);
      setRestaurants(mappedStores);
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
                      origins={geometry2.address}
                      destinations={formatted_address}
                      totalRatings={user_ratings_total}
                      storeView={storeView}
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
