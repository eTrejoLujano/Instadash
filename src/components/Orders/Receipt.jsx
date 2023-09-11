import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import OrderMapWrapper from "./OrderMapWrapper";

const Receipt = () => {
  const location = useLocation();
  return (
    <div className="w-screen h-screen flex">
      <div className="h-full w-1/4 flex items-center justify-center">
        Receipt
      </div>
      <div className="h-full w-screen flex items-center justify-center">
        <OrderMapWrapper
          originLat={+location.state.origin_lat}
          originLng={+location.state.origin_lng}
          destLat={+location.state.destination_lat}
          destLng={+location.state.destination_lng}
        />
      </div>
    </div>
  );
};

export default Receipt;
