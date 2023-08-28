import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TbHeart } from "react-icons/tb";
import * as categoriesAPI from "../../Api/categories";
import Filterbar from "../UserHome/Filterbar";

//e.preventDefault for heart saving functionality to prevent navigation to store page
const CategoryView = () => {
  const [categorySearch, setCategorySearch] = useState(null);
  const [category, setCategory] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!location.state) {
      navigate("/");
    }
    async function fetchData() {
      const categoryPick = await categoriesAPI.getCategoryPick({
        category_id: location.state.id,
      });
      setCategory(categoryPick);
    }
    fetchData();
  }, []);
  const storeView = (id) => {
    navigate("/store", { state: { id: id } });
  };
  if (!category) {
    return;
  } else {
    return (
      <div className="md:pt-[5rem] w-full h-full">
        <div className="flex flex-row justify-center items-center">
          <div className="px-4 md:px-8 lg:px-12 relative top-7 space-y-6 md:space-y-10 w-[76rem]">
            <p className="text-4xl px-4 font-bold">{category[0].name}</p>
            {/* <Filterbar /> */}
            <div className="space-y-[1rem]">
              <div className="text-3xl px-4 font-bold">All Stores</div>
              <div className="flex flex-col justify-center items-center px-4">
                <div className="w-full h-[.05rem] rounded bg-gray-200" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-4 gap-x-[1.7rem] gap-y-1 sm:gap-y-4 px-4">
                {category[0].store_category.map((store) => (
                  <div
                    key={store.id}
                    className="rounded-lg flex flex-col sm:space-y-3 max-h-full"
                    onClick={() => storeView(store.stores_info.id)}
                  >
                    <button className="h-[6rem] py-2 px-2 flex flex-row justify-between sm:border sm:rounded-md">
                      <div className="flex items-center space-x-2">
                        <img
                          alt=""
                          src={`../../../${store.stores_info.logo}`}
                          className="object-contain w-[3.4rem] h-[3.4rem] bg-gray-100 border rounded-full"
                        />
                        <div>
                          <div className="space-y-[-1rem]">
                            <div className="font-semibold relative flex flex-row pb-1">
                              <div className="">{store.stores_info.name}</div>
                            </div>
                          </div>
                          {/* <div className="text-sm pt-[1rem] text-gray-500 relative flex flex-row">
                    {store.distance} • {store.time} • {store.fee}
                  </div> */}
                          <div className="text-sm pt-[1rem] text-gray-500 relative flex flex-row">
                            rate
                            {/* <div className="pr-[.4rem]">
                      <AiOutlineStar className="top-[.2rem] relative fill-gray-500" />
                    </div> */}
                            {/* {store.reviews} */}
                          </div>
                        </div>
                      </div>

                      <button
                        className="pr-1"
                        onClick={() => console.log("hello")}
                      >
                        <TbHeart
                          size={26}

                          // className={store.save ? "fill-red-400" : ""}
                        />
                      </button>
                    </button>
                    <div className="flex sm:invisible w-screen h-[.05rem] relative top-1 rounded bg-gray-200" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default CategoryView;
