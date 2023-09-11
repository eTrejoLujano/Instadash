import { Wrapper } from "@googlemaps/react-wrapper";
import OrderMap from "./OrderMap";

const OrderMapWrapper = ({ originLat, originLng, destLat, destLng }) => {
  return (
    <Wrapper
      apiKey={import.meta.env.VITE_GOOGLE_KEY}
      version="beta"
      libraries={["marker", "places"]}
    >
      <OrderMap
        originLat={originLat}
        originLng={originLng}
        destLat={destLat}
        destLng={destLng}
      />
    </Wrapper>
  );
};
export default OrderMapWrapper;
