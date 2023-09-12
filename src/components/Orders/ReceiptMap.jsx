import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import OrderMapWrapper from "./OrderMapWrapper";
import Receipt from "./Receipt";

const ReceiptMap = () => {
  const location = useLocation();
  return (
    <div className="w-screen h-screen md:flex md:top-[0rem] top-[4rem] relative">
      <div className="hidden w-screen h-[32rem] md:h-full md:w-[32rem] md:flex z-50 pt-16 relative">
        <Receipt receiptInfo={location.state} />
      </div>
      <div className="h-1/2 md:h-full w-screen flex items-center justify-center z-0">
        <OrderMapWrapper
          originLat={+location.state.origin_lat}
          originLng={+location.state.origin_lng}
          destLat={+location.state.destination_lat}
          destLng={+location.state.destination_lng}
        />
      </div>
      <div className="md:hidden w-screen h-1/2 md:h-full md:w-[32rem] flex z-50">
        <Receipt receiptInfo={location.state} />
      </div>
    </div>
  );
};

export default ReceiptMap;
