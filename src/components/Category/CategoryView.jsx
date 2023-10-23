import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TbHeart } from "react-icons/tb";
import * as categoriesAPI from "../../Api/categories";
import { useDispatch, useSelector } from "react-redux";
import Filterbar from "../UserHome/Filterbar";
import { formatAddress } from "../Util/helperFunctions";
import { AiOutlineStar } from "react-icons/ai";
import Loading from "../Util/Loading";

const CategoryView = () => {
  const [categorySearch, setCategorySearch] = useState(null);
  const [category, setCategory] = useState();
  let [categoryStores, setCategoryStores] = useState([]);
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const restaurants = useSelector((state) => state.store.store);
  const currentAddress = useSelector((state) => state.auth.location);
  useEffect(() => {
    if (!location.state) {
      navigate("/");
    }
    async function fetchData() {
      setLoading(true);
      const categoryPick = await categoriesAPI.getCategoryPick({
        category_id: location.state.id,
      });
      setCategory(categoryPick);
      let sortedStores = categoryPick[0]?.store_category.sort((a, b) =>
        a.stores_info.name.localeCompare(b.stores_info.name)
      );
      if (restaurants) {
        let storeIndex = 0;
        let restaurantIndex = 0;
        while (
          restaurantIndex < restaurants.length &&
          storeIndex < sortedStores.length
        ) {
          if (
            restaurants[restaurantIndex].name ==
            sortedStores[storeIndex].stores_info.name
          ) {
            categoryStores.push({
              ...restaurants[restaurantIndex],
              ...sortedStores[storeIndex].stores_info,
            });
            storeIndex += 1;
          } else {
            const compare = restaurants[restaurantIndex].name.localeCompare(
              sortedStores[storeIndex].stores_info.name
            );
            if (compare == -1) {
              restaurantIndex += 1;
            } else {
              storeIndex += 1;
            }
          }
        }
      }
      setCategoryStores(categoryStores);
      setLoading(false);
    }
    fetchData();
  }, []);
  const storeView = ({ id, destinations, place_id, totalRatings }) => {
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
      <div className="md:pt-[5rem] w-full h-full relative md:top-[0rem] top-[8rem]">
        <div className="flex flex-row justify-center items-center">
          <div className="px-4 md:px-8 lg:px-12 relative top-7 space-y-6 md:space-y-10 w-[76rem]">
            {/* <p className="text-4xl px-4 font-bold">{category[0].name}</p> */}
            {/* <Filterbar /> */}
            <div className="space-y-[1rem]">
              <div className="text-3xl px-4 font-bold">All Stores</div>
              <div className="flex flex-col justify-center items-center px-4">
                <div className="w-full h-[.05rem] rounded bg-gray-200" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-4 gap-x-[1.7rem] gap-y-1 sm:gap-y-4 px-4">
                {categoryStores.map(
                  ({
                    id,
                    logo,
                    name,
                    formatted_address,
                    rating,
                    place_id,
                    user_ratings_total,
                  }) => (
                    <div
                      key={id}
                      className="rounded-lg flex flex-col sm:space-y-3 max-h-full"
                      onClick={() =>
                        storeView({
                          id,
                          destinations: formatted_address,
                          place_id,
                          totalRatings: user_ratings_total,
                        })
                      }
                    >
                      <button className="h-[6rem] py-2 px-2 flex flex-row justify-between sm:border sm:rounded-md">
                        <div className="flex items-center justify-start h-full space-x-2">
                          <img
                            alt=""
                            src={`../../../${logo}`}
                            className="object-contain w-[3.4rem] h-[3.4rem] bg-gray-100 border rounded-full"
                          />
                          <div>
                            <div className="font-semibold text-left text-base">
                              {name}
                            </div>
                            <div className="text-sm text-left text-gray-500">
                              {formatAddress(formatted_address)[0]}
                            </div>
                            <div className="flex space-x-1">
                              <div className="flex items-center">
                                <div className="text-gray-500 text-sm">
                                  {rating}
                                </div>
                                <div>
                                  <AiOutlineStar
                                    size={14}
                                    className={"fill-gray-500"}
                                  />
                                </div>
                              </div>
                              <div className="text-gray-500 text-sm">
                                ({user_ratings_total}+ ratings)
                              </div>
                            </div>
                          </div>
                        </div>

                        <button className="pr-1">
                          {/* <TbHeart
                            size={26}

                            // className={store.save ? "fill-red-400" : ""}
                          /> */}
                        </button>
                      </button>
                      <div className="flex sm:invisible w-screen h-[.05rem] relative top-1 rounded bg-gray-200" />
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default CategoryView;
