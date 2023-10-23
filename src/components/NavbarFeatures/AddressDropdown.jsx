import { useEffect, useState } from "react";
import AddressList from "../UserHome/AddressList";
import { useDispatch, useSelector } from "react-redux";
import * as locationAPI from "../../Api/location";
import {
  changeAddress,
  deleteAddress,
  locate,
} from "../../redux-store/authSlice";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { formatAddress, gmapsAddress } from "../Util/helperFunctions";

const AddressDropdown = ({ dropdownRef, inputStyling }) => {
  const dispatch = useDispatch();
  const [allAddresses, setAllAddresses] = useState(null);
  const user_id = useSelector((state) => state.auth.user.user_id);
  useEffect(() => {
    async function fetchData() {
      const addresses = await locationAPI.getAllAddresses({ user_id });
      const formattedAddresses = addresses.map((location) => {
        return {
          formattedAddress: formatAddress(location.address),
          id: location.id,
        };
      });
      setAllAddresses(formattedAddresses);
    }
    fetchData();
  }, [user_id]);
  const locationHover = () => {
    const options = {
      fields: ["formatted_address", "geometry", "name"],
      strictBounds: false,
    };
    const autocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById("address"),
      options
    );
    autocomplete.setFields(["place_id", "geometry", "name"]);
    autocomplete.addListener("place_changed", async () => {
      const place = autocomplete.getPlace();
      const coordinates = await locationAPI.getAddressCoordinates({
        address: gmapsAddress(place.formatted_address),
      });
      dispatch(
        locate({
          address: place.formatted_address,
          latitude: coordinates.results[0].geometry.location.lat,
          longitude: coordinates.results[0].geometry.location.lng,
          user_id: user_id,
        })
      );
    });
  };
  const changeAddressClick = (id) => {
    dispatch(changeAddress({ address_id: id, user_id }));
  };
  const deleteAddressClick = (id) => {
    dispatch(deleteAddress({ address_id: id, user_id }));
  };
  return (
    <div
      className="max-w-fit border-black shadow-2xl shadow-gray-400 rounded-lg pt-[1.2rem] absolute z-20 h-fit max-h-[39rem]
      top-[3rem] left-[-9rem] bg-white flex flex-col justify-start overflow-scroll"
      ref={dropdownRef}
    >
      <div className="w-full space-y-2 px-[1.1rem] pb-3">
        <div>Enter Your Address</div>
        <input
          className={inputStyling}
          type="text"
          name="address"
          id="address"
          placeholder="Enter a Location"
          onMouseOver={() => locationHover()}
        />
        <div className="absolute top-[3.2rem] left-[1.6rem] z-50">
          <HiOutlineLocationMarker size={23} />
        </div>
      </div>
      <div className="w-full h-[.5rem] pb-2 border-t border-b border-gray-200 bg-gray-100"></div>
      <div className="px-[1.2rem] divide-solid divide-y overflow-y-scroll overscroll-y-contain container-snap">
        {allAddresses &&
          allAddresses.map(({ formattedAddress, id }) => (
            <AddressList
              key={id}
              id={id}
              address={formattedAddress}
              changeAddress={changeAddressClick}
              deleteAddress={deleteAddressClick}
            />
          ))}
      </div>
    </div>
  );
};

export default AddressDropdown;
