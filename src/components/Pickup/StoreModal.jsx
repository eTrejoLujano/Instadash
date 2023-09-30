import { useEffect, useState } from "react";
import * as pickupAPI from "../../Api/pickup";
import { currencyFormat } from "../Util/helperFunctions";
import FoodModal from "../Store/FoodModal";
const StoreModal = ({
  place_id,
  name,
  open,
  rating,
  totalRatings,
  destinations,
  origins,
  storeView,
  itemModal,
}) => {
  const [menu, setMenu] = useState();
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({});
  const [distance, setDistance] = useState();
  const [placeDetails, setPlaceDetails] = useState();
  useEffect(() => {
    async function fetchData() {
      const items = await pickupAPI.getStorePickup({ store_name: name });
      const travel = await pickupAPI.getDistance({ destinations, origins });
      const placeDetails = await pickupAPI.getPlaceDetails({ place_id });
      setMenu(items);
      setDistance(travel);
      setPlaceDetails(placeDetails);
    }
    fetchData();
  }, []);
  console.log("placedetails>>>>>>", placeDetails);
  const buttonStyling =
    "w-[9.5rem] h-[2.9rem] font-medium text-sm rounded-full flex justify-center items-center border border-gray-200 hover:bg-gray-200";

  if (!menu) {
    return;
  } else {
    return (
      <div
        className="overflow-x w-[22rem] max-h-fit bg-white shadow-sm shadow-gray-400 pt-4 pb-3 rounded-xl"
        onClick={() =>
          storeView(
            name,
            placeDetails.result,
            distance.rows[0].elements[0],
            totalRatings,
            true,
            place_id
          )
        }
      >
        <div className="flex px-5">
          <div className="text-black text-base font-medium">{name}</div>
          <div></div>
        </div>
        <div className="text-gray-500 text-xs px-5">
          {rating} ({totalRatings}) •{" "}
          {/* {distance.rows[0].elements[0].distance.text} • */}
          {distance.rows[0].elements[0].duration.text}
        </div>
        <div className="space-y-5">
          {open && open.open_now ? (
            <div className="text-green-500 text-sm px-5">open</div>
          ) : (
            <div className="text-red-500 text-sm px-5">closed</div>
          )}
          <div
            className="flex flex-row w-full h-full overscroll-x-contain overflow-x-scroll
           container-snap scroll-smooth space-x-[1rem] overflow-y-contain pl-5"
          >
            {menu[0].store_items.map(
              ({ id, name, image, prices, description }) => (
                <div
                  key={id}
                  onClick={(e) => {
                    itemModal({
                      id,
                      name,
                      image,
                      description,
                      place_id,
                      price: prices,
                    });
                    e.stopPropagation();
                  }}
                >
                  <div className="max-h-fit w-full">
                    <img
                      alt=""
                      src={`../../../${image}`}
                      className="rounded-md relative w-[7rem] h-[7rem] object-cover"
                    />
                  </div>

                  <div className="text-xs">{name}</div>
                  <div className="text-xs">{currencyFormat(+prices)}</div>
                </div>
              )
            )}
          </div>
        </div>
        <div className="flex justify-between px-5 pt-3">
          <button
            onClick={(e) => {
              storeView(
                name,
                placeDetails.result,
                distance.rows[0].elements[0],
                totalRatings,
                false,
                place_id
              );
              e.stopPropagation();
            }}
            className={buttonStyling}
          >
            Delivery
          </button>
          <button className={buttonStyling}>Pickup</button>
        </div>
      </div>
    );
  }
};

export default StoreModal;
