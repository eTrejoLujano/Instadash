import React from "react";
import { BsCircle } from "react-icons/bs";
import { CgClose } from "react-icons/cg";

const AddressList = ({ id, address, changeAddress, deleteAddress }) => {
  return (
    <div
      key={id}
      className="h-[4.5rem] bg-white flex items-center justify-between cursor-pointer"
      onClick={() => changeAddress(id)}
    >
      <div className="flex space-x-[1.4rem] items-center">
        <div>
          <BsCircle className={id == address.id && "fill-red-500"} size={20} />
          {address.id && id == address.id && (
            <div className="relative flex left-[0.25rem] bottom-[1rem] w-3 h-3 rounded-full bg-red-500" />
          )}
        </div>
        <div>
          <div className={id == address.id && "text-red-500"}>{address[0]}</div>
          <div
            className={`${
              id == address.id ? "text-red-500" : "text-gray-500"
            } text-xs`}
          >
            {address[1]}
          </div>
        </div>
      </div>
      <div className="flex space-x-[1.2rem]">
        {/* <HiOutlinePencil size={20} /> */}
        <CgClose onClick={() => deleteAddress(id)} size={20} />
      </div>
    </div>
  );
};

export default AddressList;
