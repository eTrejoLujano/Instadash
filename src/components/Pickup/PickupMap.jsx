import React, { useState, useCallback, useRef, useEffect } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import * as pickupAPI from "../../Api/pickup";
import Restaurants from "./Restaurants";
import { useSelector } from "react-redux";

const PickupMap = () => {
  const [map, setMap] = useState();
  const ref = useRef();
  const geometry = useSelector((state) => state.auth.location);
  const mapOptions = {
    mapId: import.meta.env.VITE_MAP_ID,
    center: {
      lat: geometry && +geometry.latitude,
      lng: geometry && +geometry.longitude,
    },
    zoom: 14,
    disableDefaultUI: true,
    clickableIcons: false,
    gestureHandling: "cooperative",
  };
  useEffect(() => {
    console.log(ref.current);
    setMap(new window.google.maps.Map(ref.current, mapOptions));
  }, [geometry]);

  return (
    <>
      <div ref={ref} id="map" className="w-screen h-screen" />

      {map && <Restaurants map={map} />}
    </>
  );
};

export default PickupMap;
