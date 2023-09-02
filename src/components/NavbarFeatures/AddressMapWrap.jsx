import { Wrapper } from "@googlemaps/react-wrapper";
import AddressModal from "./AddressModal";
import AddressDropdown from "./AddressDropdown";

const AddressMapWrap = () => {
  return (
    <Wrapper
      apiKey={import.meta.env.VITE_GOOGLE_KEY}
      version="beta"
      libraries={["marker", "places"]}
    >
      <AddressModal />
      <AddressDropdown />
    </Wrapper>
  );
};

export default AddressMapWrap;
