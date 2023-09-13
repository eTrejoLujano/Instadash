import React, { useState, useCallback, useRef, useEffect } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import * as pickupAPI from "../../Api/pickup";
import Restaurants from "./Restaurants";
import { useSelector } from "react-redux";
import FoodModal from "../Store/FoodModal";
import Loading from "../Util/Loading";
import { StoreList } from "./StoreList";

const PickupMap = ({ storeView, storeViewList }) => {
  const [map, setMap] = useState();
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({});
  let [loading, setLoading] = useState();
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
    setLoading(true);
    setMap(new window.google.maps.Map(ref.current, mapOptions));
    setLoading(false);
  }, [geometry]);
  const itemModal = (object) => {
    setShowModal(true);
    setModalInfo(object);
  };
  const modalClose = () => {
    setShowModal(false);
  };
  if (loading) return <Loading />;
  else
    return (
      <div className="md:flex md:top-[0rem] top-[0rem] h-screen relative w-screen">
        <div className="max-h-4/5">
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
        </div>
        <div className="hidden md:h-full md:w-[26.7rem] md:flex pt-16 relative">
          <StoreList storeView={storeViewList} itemModal={itemModal} />
        </div>
        <div
          ref={ref}
          id="map"
          className="h-2/3 md:h-screen w-screen flex items-center justify-center z-0"
        />

        {map && (
          <Restaurants storeView={storeView} map={map} itemModal={itemModal} />
        )}

        <div className="md:hidden w-full h-1/3 md:h-full md:w-[32rem] flex">
          <StoreList storeView={storeViewList} itemModal={itemModal} />
        </div>
      </div>
    );
};

export default PickupMap;
