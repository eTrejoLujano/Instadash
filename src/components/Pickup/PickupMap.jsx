import React, { useState, useCallback, useRef, useEffect } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import * as pickupAPI from "../../Api/pickup";
import Restaurants from "./Restaurants";
import { useSelector } from "react-redux";
import FoodModal from "../Store/FoodModal";

const PickupMap = ({ storeView }) => {
  const [map, setMap] = useState();
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({});
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
    setMap(new window.google.maps.Map(ref.current, mapOptions));
  }, [geometry]);
  const itemModal = (object) => {
    setShowModal(true);
    setModalInfo(object);
  };
  const modalClose = () => {
    setShowModal(false);
  };
  console.log("show modal", showModal);
  return (
    <div className="md:top-[0rem] top-[0rem] relative w-screen">
      {showModal && (
        <FoodModal
          itemId={modalInfo.id}
          name={modalInfo.name}
          description={modalInfo.description}
          image={modalInfo.image}
          price={modalInfo.price}
          handleClose={modalClose}
          place_id={modalInfo.place_id}
        />
      )}
      <div ref={ref} id="map" className="w-screen h-screen" />
      {map && (
        <Restaurants storeView={storeView} map={map} itemModal={itemModal} />
      )}
    </div>
  );
};

export default PickupMap;
