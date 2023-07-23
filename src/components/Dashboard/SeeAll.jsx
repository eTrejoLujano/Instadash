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
    <div className="lg:pt-[5rem] w-screen h-full justify-center items-center sm:px-4">
      <div className="flex flex-row justify-center items-center">
        <div className="px-4 sm:px-0 relative top-5 space-y-6">
          <p className="text-4xl font-bold">{location.state.name}</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 sm:gap-9 gap-4 px-4 md:px-0">
            {location.state.stores.map((store) => (
              <div
                key={store.id}
                className="rounded-lg flex flex-col space-y-3"
                onClick={() => storeView(store.id)}
              >
                <div className="h-[14rem] flex flex-col justify-center">
                  <img
                    alt=""
                    src={store.src}
                    className="rounded-md object-cover relative w-screen h-full md:w-[25rem] md:h-[13rem]"
                  />
                </div>
                <div className="space-y-[-1rem]">
                  <div className="font-semibold relative flex flex-row pb-1">
                    <div className="">{store.name}</div>
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
                  <div className="text-sm pt-[1rem] text-gray-500 relative flex flex-row">
                    {store.distance} • {store.time} • {store.fee}
                  </div>
                  <div className="text-sm pt-[1rem] text-gray-500 relative flex flex-row">
                    {store.rate}
                    <div className="pr-[.4rem]">
                      <AiOutlineStar className="top-[.2rem] relative fill-gray-500" />
                    </div>
                    {store.reviews}
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
