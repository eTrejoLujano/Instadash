import { Wrapper } from "@googlemaps/react-wrapper";
import PickupMap from "./PickupMap";
import { useLocation, useNavigate } from "react-router-dom";

const MapWrapper = () => {
  const navigate = useNavigate();
  const storeView = (
    nameValue,
    detailsValue,
    distanceValue,
    ratingsValue,
    pickupBool,
    place_id
  ) => {
    navigate("/store", {
      state: {
        name: nameValue,
        details: detailsValue,
        distance: distanceValue,
        totalRatings: ratingsValue,
        pickup: pickupBool,
        place_id,
      },
    });
  };
  return (
    <Wrapper
      apiKey={import.meta.env.VITE_GOOGLE_KEY}
      version="beta"
      libraries={["marker", "places"]}
    >
      <PickupMap storeView={storeView} />
    </Wrapper>
  );
};
export default MapWrapper;
