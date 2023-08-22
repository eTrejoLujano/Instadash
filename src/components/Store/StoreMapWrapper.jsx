import { Wrapper } from "@googlemaps/react-wrapper";
import StoreMap from "./StoreMap";

const StoreMapWrapper = ({ lat, lng }) => {
  return (
    <Wrapper
      apiKey={import.meta.env.VITE_GOOGLE_KEY}
      version="beta"
      libraries={["marker", "places"]}
    >
      <StoreMap lat={lat} lng={lng} />
    </Wrapper>
  );
};
export default StoreMapWrapper;
