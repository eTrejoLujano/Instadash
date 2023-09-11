import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as checkoutAPI from "../../Api/checkout";
import { useSelector } from "react-redux";
import Loading from "../Util/Loading";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { TfiReceipt } from "react-icons/tfi";
import { currencyFormat, orderDateFormat } from "../Util/helperFunctions";

const OrderHistory = () => {
  const navigate = useNavigate();
  const [orderHistory, setOrderHistory] = useState();
  const [loading, setLoading] = useState();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const orders = await checkoutAPI.getOrders({
        user_id: auth.user.user_id,
      });
      setOrderHistory(orders);
      console.log(orders);
      setLoading(false);
      console.log(orderDateFormat(new Date(orders[0].date).toString()));
    }
    fetchData();
  }, []);
  const storeView = ({ id, origins, destinations, place_id }) => {
    navigate("/store", {
      state: {
        id,
        origins,
        destinations,
        place_id,
      },
    });
  };
  const receiptView = ({
    id,
    cart,
    date,
    origin,
    origin_lat,
    origin_lng,
    isDelivery,
    destination,
    destination_lat,
    destination_lng,
    total,
    totalQuantity,
  }) => {
    navigate("/orders/receipt", {
      state: {
        id,
        cart,
        date,
        origin,
        origin_lat,
        origin_lng,
        isDelivery,
        destination,
        destination_lat,
        destination_lng,
        total,
        totalQuantity,
      },
    });
  };
  if (loading) return <Loading />;
  return (
    <div className="w-full h-full pt-20 flex justify-center px-4 md:top-[0rem] top-[4rem] relative">
      <div className="max-w-[58rem] w-full h-full space-y-8">
        <div className="font-semibold text-2xl">Orders</div>
        <div className="font-semibold text-lg">Completed</div>
        <div className="space-y-3">
          {orderHistory &&
            orderHistory.map(
              ({
                id,
                cart,
                date,
                origin,
                origin_lat,
                origin_lng,
                isDelivery,
                destination,
                destination_lat,
                destination_lng,
                total,
                totalQuantity,
              }) => (
                <div
                  key={id}
                  className="w-full min-h-[10rem] h-fit border rounded-xl hover:bg-gray-100 cursor-pointer"
                >
                  <div
                    className="h-[3rem] px-4 rounded-t-xl bg-gray-100 flex items-center justify-between"
                    onClick={() =>
                      storeView({
                        id: cart[0].items_info.stores_info.id,
                        origins: origin,
                        destinations: destination,
                        place_id: cart[0].place_id,
                      })
                    }
                  >
                    <div className="font-semibold">
                      {cart[0].items_info.stores_info.name}
                    </div>
                    <div>
                      <MdOutlineArrowForwardIos />
                    </div>
                  </div>
                  <div
                    className="min-h-[7rem] h-fit flex flex-col items-start justify-start md:flex-row md:justify-between md:items-center px-4 w-full"
                    onClick={() =>
                      receiptView({
                        id,
                        cart,
                        date,
                        origin,
                        origin_lat,
                        origin_lng,
                        isDelivery,
                        destination,
                        destination_lat,
                        destination_lng,
                        total,
                        totalQuantity,
                      })
                    }
                  >
                    <div className="w-full md:w-5/6">
                      <div className="text-gray-500 text-sm flex space-x-1">
                        <div>{orderDateFormat(new Date(date).toString())}</div>
                        <div>•</div>
                        <div>{currencyFormat(+total)}</div>
                        <div>•</div>
                        <div>{totalQuantity} items</div>
                      </div>
                      <div className="line-clamp-2 space-x-1 pr-6">
                        {cart.map(({ items_info }, index) => (
                          <span key={items_info.id}>
                            {items_info.name}{" "}
                            {cart.length - 1 == index ? " " : "•"}{" "}
                          </span>
                        ))}
                      </div>
                      <div className="text-sm text-gray-500 line-clamp-1">
                        {destination}
                      </div>
                    </div>
                    <div className="w-[9rem] flex items-center justify-end py-3">
                      <div className="font-semibold rounded-full w-[9rem] h-[2.8rem] border flex justify-center items-center space-x-1 bg-gray-200 hover:bg-gray-300">
                        <div>
                          <TfiReceipt />
                        </div>
                        <div className="truncate">View Receipt</div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
