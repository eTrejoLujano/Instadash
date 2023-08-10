import { useState, useEffect } from "react";
import * as categoriesAPI from "../../Api/categories";
import * as dashboardsAPI from "../../Api/dashboards";
import FoodTypes from "./FoodTypes";
import Filterbar from "./Filterbar";
import Ads from "./Ads";

import StoreOptions from "./StoreOptions";
import Categories from "../Category/Catogories";

const UserHome = () => {
  const [dashboard, setDashboard] = useState();
  // const [categorySearch, setCategorySearch] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const dashboards = await dashboardsAPI.getDashboards();
      setDashboard(dashboards);
      // if (categorySearch) {
      //   const categoryPick = await categoriesAPI.getCategoryPick({
      //     category_id: categorySearch,
      //   });
      //   console.log("categoryPick", categoryPick);
      // }
    }
    fetchData();
  }, []);

  return (
    <div>
      <Categories />
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
