import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import Marker from "../Pickup/Marker";
import { FaUtensils, FaHome } from "react-icons/fa";
import { FaStoreAlt, FaRegCreditCard } from "react-icons/fa";

const OrderMap = ({ originLat, originLng, destLat, destLng }) => {
  const [map, setMap] = useState();
  const ref = useRef();
  const mapOptions = {
    mapId: import.meta.env.VITE_MAP_ID,
    center: {
      lat: originLat,
      lng: originLng,
    },
    zoom: 14,
    disableDefaultUI: true,
    clickableIcons: false,
    gestureHandling: "cooperative",
  };
  useEffect(() => {
    setMap(new window.google.maps.Map(ref.current, mapOptions));
  }, []);

  return (
    <>
      <div ref={ref} id="map" className="w-full h-full rounded-lg" />
      <Marker
        map={map}
        position={{
          lat: originLat,
          lng: originLng,
        }}
      >
        <div
          className="w-7 h-7 bg-black rounded-full flex justify-center items-center
          shadow-sm shadow-gray-400"
        >
          <FaHome size={17} className="text-white" />
        </div>
      </Marker>
      <Marker
        map={map}
        position={{
          lat: destLat,
          lng: destLng,
        }}
      >
        <div
          className="w-7 h-7 bg-black rounded-full flex justify-center items-center
          shadow-sm shadow-gray-400"
        >
          <FaStoreAlt size={17} className="text-white" />
        </div>
      </Marker>
    </>
  );
};

export default OrderMap;
