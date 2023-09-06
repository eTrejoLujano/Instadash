import { Wrapper } from "@googlemaps/react-wrapper";
import StoreMap from "./StoreMap";
import AddressModal from "../NavbarFeatures/AddressModal";
import AddressDropdown from "../NavbarFeatures/AddressDropdown";
import Navbar from "../Navbar";

const StoreMapWrapper = ({ lat, lng, logo }) => {
  return (
    <Wrapper
      apiKey={import.meta.env.VITE_GOOGLE_KEY}
      version="beta"
      libraries={["marker", "places"]}
    >
      <StoreMap lat={lat} lng={lng} logo={logo} />
    </Wrapper>
  );
};
export default StoreMapWrapper;
