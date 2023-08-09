import { useState, useEffect } from "react";
import * as categoriesAPI from "../../Api/categories";
import * as dashboardsAPI from "../../Api/dashboards";
import FoodTypes from "./FoodTypes";
import Filterbar from "./Filterbar";
import Ads from "./Ads";

import StoreOptions from "./StoreOptions";

const UserHome = () => {
  const [category, setCategory] = useState();
  const [dashboard, setDashboard] = useState();
  const [categorySearch, setCategorySearch] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const categories = await categoriesAPI.getCategories();
      const dashboards = await dashboardsAPI.getDashboards();
      setCategory(categories);
      setDashboard(dashboards);
      if (categorySearch) {
        const categoryPick = await categoriesAPI.getCategories();
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <div
        className="lg:h-[8.8rem] h-[5rem] text-black bg-gray-100 border-solid border 
    border-gray-100"
      >
        <div className="scroll-smooth flex flex-row justify-center">
          <div
            className="flex flex-row items-center
        lg:h-[7rem] h-[4.6rem] lg:my-11 overflow-x-scroll overscroll-x-contain 
        container-snap space-x-3"
          >
            {category?.map(({ id, name, image }) => (
              <div
                key={id}
                className="rounded-full py-2.5 px-2 text-sm bg-white 
              flex flex-row space-x-2 cursor-pointer"
              >
                <div className="rounded-full h-9 w-9 bg-sky-100 ">
                  <div className="w-9">
                    <img src={`../../../${image}`} />
                  </div>
                </div>
                <div className="pt-1.5 text-base">{name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FoodTypes />
      {/* <Filterbar /> */}
      <Ads />
      <div className="space-y-5 pt-1">
        {dashboard?.map((dashboard) => (
          <StoreOptions
            key={dashboard.id}
            stores={dashboard.store_dashboard}
            name={dashboard.name}
          />
        ))}
      </div>
    </div>
  );
};

export default UserHome;
