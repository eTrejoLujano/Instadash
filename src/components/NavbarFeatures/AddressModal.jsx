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
import { formatAddress } from "../Util/helperFunctions";
import { VscClose } from "react-icons/vsc";

const AddressModal = ({ handleClose, inputStyling }) => {
  const dispatch = useDispatch();
  const [allAddresses, setAllAddresses] = useState(null);
  const user_id = useSelector((state) => state.auth.user.user_id);
  const currentAddress = useSelector((state) => state.auth.location);

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
  }, [currentAddress, user_id]);

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
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      dispatch(
        locate({
          address: place.formatted_address,
          latitude:
            (place.geometry.viewport.eb.lo + place.geometry.viewport.eb.hi) / 2,
          longitude:
            (place.geometry.viewport.La.lo + place.geometry.viewport.La.hi) / 2,
          user_id: user_id,
        })
      );
    });
  };
  const changeAddressClick = (id) => {
    dispatch(changeAddress({ address_id: id, user_id }));
    handleClose();
  };
  const deleteAddressClick = (id) => {
    dispatch(deleteAddress({ address_id: id, user_id }));
  };
  return (
    <div className="md:hidden flex">
      <div className="flex fixed w-screen h-screen items-center justify-center z-50">
        <div
          className="w-full md:max-h-[47rem] h-full sm:h-5/6 md:h-fit py-6 border-black shadow-2xl shadow-gray-400 rounded-2xl 
      left-[29.5rem] bg-white flex flex-col"
        >
          <div className="w-full space-y-2 px-[.7rem]">
            <VscClose
              size={29}
              className="cursor-pointer"
              onClick={() => handleClose()}
            />
            <div className="text-3xl font-bold px-1">Change Address</div>
            <div>
              <input
                className={inputStyling}
                type="text"
                name="address"
                id="address"
                placeholder="Enter a Location"
                onMouseOver={() => locationHover()}
              />
              <div className="absolute top-[7rem] left-[1.3rem] z-50 ">
                <HiOutlineLocationMarker size={23} />
              </div>
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
      </div>
      <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};

export default AddressModal;
