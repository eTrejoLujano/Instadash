import { useState, useEffect } from "react";
import * as pickupAPI from "../../Api/pickup";
import Marker from "./Marker";
import { FaUtensils } from "react-icons/fa";
import StoreModal from "./StoreModal";

const Restaurants = ({ map }) => {
  const [restuarants, setRestaurants] = useState();
  const [hover, setHover] = useState();
  const [pick, setPick] = useState();
  useEffect(() => {
    async function fetchData() {
      const restaurantsOptions = await pickupAPI.getRestaurants();
      const fastfoodOptions = await pickupAPI.getFastFood();
      console.log([...restaurantsOptions.results, ...fastfoodOptions.results]);
      setRestaurants([
        ...restaurantsOptions.results,
        ...fastfoodOptions.results,
      ]);
    }
    fetchData();
  }, []);
  if (!restuarants) {
    return;
  } else {
    return (
      <div className="">
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
              onClick={() => setPick(place_id)}
            >
              <div className="w-full flex flex-col items-center relative z-0">
                <div
                  className={`w-7 h-7 flex justify-center items-center shadow-sm
               rounded-full ${
                 hover === place_id ? "bg-red-500" : "bg-white"
               } shadow-gray-400`}
                  // onMouseEnter={() => {
                  //   console.log("hover ");
                  //   setHover(place_id);
                  // }}
                  // onMouseLeave={() => {
                  //   console.log("not hover");
                  //   setHover(null);
                  // }}
                >
                  <FaUtensils size={17} className="text-red-500"></FaUtensils>
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
