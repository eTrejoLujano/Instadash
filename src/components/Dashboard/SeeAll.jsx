import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineStar } from "react-icons/ai";

const SeeAll = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!location.state) {
      navigate("/");
    }
  }, []);
  const storeView = (id) => {
    navigate("/store", { state: { id: id } });
  };
  return (
    <div className="md:pt-[5rem] w-screen h-full">
      <div className="flex flex-row justify-center items-center">
        <div className="px-4 md:px-8 lg:px-12 relative top-7 space-y-6 md:space-y-10 w-[76rem]">
          <p className="text-4xl px-4 md:px-0 font-bold">
            {location.state.name}
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 sm:gap-8 gap-4 px-4 md:px-0">
            {location.state.stores.map((store) => (
              <div
                key={store.id}
                className="rounded-lg flex flex-col space-y-3 max-h-full"
                onClick={() => storeView(store.stores_info.id)}
              >
                <div className="h-[12rem] flex flex-col justify-center">
                  <img
                    alt=""
                    src={`../../../${store.stores_info.image}`}
                    className="rounded-md object-cover relative w-full h-full"
                  />
                </div>
                <div className="space-y-[-1rem]">
                  <div className="font-semibold relative flex flex-row pb-1">
                    <div className="">{store.stores_info.name}</div>
                    <button
                      className="absolute right-[.6rem] z-20"
                      // onClick={async () => handleSave(store.id)}
                    >
                      {/* <TbHeart
                  size={26}
                  className={store.save ? "fill-red-400" : ""}
                /> */}
                    </button>
                  </div>
                  {/* <div className="text-sm pt-[1rem] text-gray-500 relative flex flex-row">
                    {store.distance} • {store.time} • {store.fee}
                  </div> */}
                  <div className="text-sm pt-[1rem] text-gray-500 relative flex flex-row">
                    {store.rate}
                    <div className="pr-[.4rem]">
                      <AiOutlineStar className="top-[.2rem] relative fill-gray-500" />
                    </div>
                    {/* {store.reviews} */}
                  </div>
                </div>
                <div className="flex sm:invisible w-full h-[.05rem] relative top-1 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeeAll;
