import { Wrapper } from "@googlemaps/react-wrapper";
import PickupMap from "./PickupMap";

const MapWrapper = () => {
  return (
    <Wrapper
      apiKey={import.meta.env.VITE_GOOGLE_KEY}
      version="beta"
      libraries={["marker"]}
    >
      <PickupMap />
    </Wrapper>
  );
};
export default MapWrapper;
