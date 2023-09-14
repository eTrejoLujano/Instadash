import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineStar } from "react-icons/ai";
import Loading from "../Util/Loading";
import { formatAddress } from "../Util/helperFunctions";

const SavedStores = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let [savedStoresStores, setSavedStoresStores] = useState([]);
  const [loading, setLoading] = useState();
  const auth = useSelector((state) => state.auth);
  const restaurants = useSelector((state) => state.store.store);
  const currentAddress = useSelector((state) => state.auth.location);
  useEffect(() => {
    setLoading(true);
    const filteredStores = restaurants
      .map(({ users }) => users.filter((userId) => userId == auth.user.user_id))
      .filter((a) => a.length);
    console.log("filteredStores", filteredStores);
    setLoading(false);
  }, []);
  const storeView = ({ id, destinations, place_id, totalRatings }) => {
    console.log("PLACE ID", place_id);
    navigate("/store", {
      state: {
        id,
        destinations,
        place_id,
        totalRatings,
        origins: currentAddress.address,
      },
    });
  };
  if (loading) return <Loading />;
  else
    return (
      <div className="md:pt-[5rem] w-screen h-full md:top-[0rem] top-[8rem] relative">
        <div className="flex flex-row justify-center items-center">
          <div className="px-4 md:px-8 lg:px-12 relative top-7 space-y-6 md:space-y-10 w-[76rem]">
            <p className="text-4xl px-4 md:px-0 font-bold">Saved Stores</p>
            <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 sm:gap-8 gap-4 px-4 md:px-0">
              {savedStoresStores.map(
                ({
                  id,
                  formatted_address,
                  image,
                  name,
                  rating,
                  user_ratings_total,
                  place_id,
                }) => (
                  <div
                    key={id}
                    className="rounded-lg flex flex-col space-y-3 max-h-full cursor-pointer"
                    onClick={() =>
                      storeView({
                        id,
                        destinations: formatted_address,
                        place_id,
                        totalRatings: user_ratings_total,
                      })
                    }
                  >
                    <div className="h-[12rem] flex flex-col justify-center">
                      <img
                        alt=""
                        src={`../../../${image}`}
                        className="rounded-md object-cover relative w-full h-full"
                      />
                    </div>
                    <div className="w-full flex justify-between">
                      <div>
                        <div className="font-semibold text-base">{name}</div>
                        <div className="text-sm text-gray-600">
                          {formatAddress(formatted_address)[0]}
                        </div>
                        <div className="flex space-x-1">
                          <div className="flex items-center">
                            <div className="text-gray-600 text-sm">
                              {rating}
                            </div>
                            <div>
                              <AiOutlineStar
                                size={14}
                                className={"fill-gray-600"}
                              />
                            </div>
                          </div>
                          <div className="text-gray-600 text-sm">
                            ({user_ratings_total}+ ratings)
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex sm:invisible w-full h-[.05rem] relative top-1 rounded bg-gray-200" />
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    );
};

export default SavedStores;
