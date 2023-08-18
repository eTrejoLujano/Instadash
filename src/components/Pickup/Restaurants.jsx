import { useState, useEffect } from "react";
import * as pickupAPI from "../../Api/pickup";
import Marker from "./Marker";
import { FaUtensils, FaHome } from "react-icons/fa";
import StoreModal from "./StoreModal";
import { useSelector } from "react-redux";

const Restaurants = ({ map, lat, lng }) => {
  const [restuarants, setRestaurants] = useState();
  const [hover, setHover] = useState();
  const [pick, setPick] = useState();
  const geometry2 = useSelector((state) => state.auth.location);
  // const [center, setCenter]  = useState();
  useEffect(() => {
    console.log("trigger use effect");
    async function fetchData() {
      // setCenter({ lat: +geometry.latitude, lng: +geometry.longitude });
      const restaurantsOptions = await pickupAPI.getRestaurants({
        lat: +geometry2.latitude,
        lng: +geometry2.longitude,
      });
      const fastfoodOptions = await pickupAPI.getFastFood({
        lat: +geometry2.latitude,
        lng: +geometry2.longitude,
      });
      console.log([...restaurantsOptions.results, ...fastfoodOptions.results]);
      setRestaurants([
        ...restaurantsOptions.results,
        ...fastfoodOptions.results,
      ]);
    }
    fetchData();
  }, [geometry2]);

  const homeMarker = () => {
    return (
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
    );
  };
  console.log("geometry", geometry2);
  if (!restuarants) {
    return;
  } else {
    return (
      <div className="">
        {/* {homeMarker} */}
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
              onClick={() => setPick(place_id)}
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
