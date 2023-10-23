import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  capitalizeFirstLetter,
  currencyFormat,
  formatAddress,
} from "../Util/helperFunctions";
import { IoIosClose } from "react-icons/io";

const Receipt = ({ receiptInfo }) => {
  const auth = useSelector((state) => state.auth);
  const [taxesAndFees, setTaxesAndFees] = useState();
  let [subtotal, setSubtotal] = useState(0);
  useEffect(() => {
    for (let i = 0; i < receiptInfo.cart.length; i++) {
      subtotal +=
        +receiptInfo.cart[i].items_info.prices * receiptInfo.cart[i].quantity;
    }
    setTaxesAndFees(+subtotal * 0.0975 + (receiptInfo.isDelivery ? 3 : 0));
    setSubtotal(subtotal);
  }, []);

  if (auth.user)
    return (
      <div className="px-7 md:py-7 pt-7 pb-12 md:pb-0 divide-y-[.1rem] h-full w-full divide-gray-200 overflow-y-scroll overscroll-y-contain container-snap">
        <div className="pb-4">
          <div className="text-xl font-bold text-red-600">
            {receiptInfo.cart[0].items_info.stores_info.name}
          </div>
          <span>
            {receiptInfo.cart[0].items_info.stores_info.name},{" "}
            {receiptInfo.destination}
          </span>
          <div>
            {new Date(receiptInfo.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}{" "}
          </div>
        </div>
        <div>
          <div className="py-4">
            <div className="text-lg font-semibold">
              {capitalizeFirstLetter(auth.user.first_name)}{" "}
              {capitalizeFirstLetter(auth.user.last_name)}
            </div>
            <div>{formatAddress(receiptInfo.origin)[0]}</div>
            <div>{formatAddress(receiptInfo.origin)[1]}</div>
          </div>
          <div className="py-2 font-semibold text-lg text-red-600">
            Order Details
          </div>
          <div className="py-2 divide-y">
            {receiptInfo.cart.map(({ items_info, quantity, id }) => (
              <div key={id} className="flex justify-between py-[1rem]">
                <div className="flex">
                  <div className="flex items-center font-bold">
                    {quantity}
                    <IoIosClose size={17} />
                  </div>
                  <div>{items_info.name}</div>
                </div>
                <div>{currencyFormat(+items_info.prices * quantity)}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between py-5">
          <div className="space-y-2">
            <div className="font-semibold">Subtotal</div>
            {receiptInfo.isDelivery && <div>Delivery Fee</div>}
            <div>Fees & Estimated Tax</div>
            {receiptInfo.isDelivery && <div>Dasher Tip</div>}
            <div className="font-semibold">Total</div>
          </div>
          <div className="space-y-2">
            <div className="font-semibold">{currencyFormat(subtotal)}</div>
            {receiptInfo.isDelivery && <div>{currencyFormat(5.99)}</div>}
            <div>{currencyFormat(+taxesAndFees)}</div>
            {receiptInfo.isDelivery && (
              <div>
                {currencyFormat(
                  +receiptInfo.total - subtotal - 5.99 - +taxesAndFees
                )}
              </div>
            )}
            <div className="font-semibold">
              {currencyFormat(+receiptInfo.total)}
            </div>
          </div>
        </div>
      </div>
    );
};

export default Receipt;
