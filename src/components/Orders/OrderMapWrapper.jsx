import { Wrapper } from "@googlemaps/react-wrapper";
import OrderMap from "./OrderMap";

const OrderMapWrapper = ({ lat, lng, logo }) => {
  return (
    <Wrapper
      apiKey={import.meta.env.VITE_GOOGLE_KEY}
      version="beta"
      libraries={["marker", "places"]}
    >
      <OrderMap lat={lat} lng={lng} logo={logo} />
    </Wrapper>
  );
};
export default OrderMapWrapper;
