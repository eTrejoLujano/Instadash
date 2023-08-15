import React, { useState, useCallback, useRef, useEffect } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import * as pickupAPI from "../../Api/pickup";
import Restaurants from "./Restaurants";

const PickupMap = () => {
  const [map, setMap] = useState();
  // const [disableScroll, setDisableScroll] = useState(null);
  const ref = useRef();

  const mapOptions = {
    mapId: import.meta.env.VITE_MAP_ID,
    center: {},
    zoom: 14,
    disableDefaultUI: true,
    clickableIcons: false,
    // disableAutoPan: true,
    draggable: true,
    gestureHandling: "cooperative",
    zoomControl: false,
  };
  // const disableScroll = () => {
  // setScroll
  // }

  useEffect(() => {
    console.log(ref.current);
    setMap(new window.google.maps.Map(ref.current, mapOptions));
  }, []);

  return (
    <>
      <div ref={ref} id="map" className="w-screen h-screen" />

      {map && <Restaurants map={map} />}
    </>
  );
};

export default PickupMap;
