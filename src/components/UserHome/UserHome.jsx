import CategoryBar from "./CategoryBar";
import FoodTypes from "./FoodTypes";
import Filterbar from "./Filterbar";
import Ads from "./Ads";
import National from "./National";
import Fastest from "./Fastest";
import Breakfast from "./Breakfast";
import Convenience from "./Convenience";
import Grocery from "./Grocery";

const UserHome = () => {
  return (
    <div>
      <CategoryBar />
      <FoodTypes />
      <Filterbar />
      <Ads />
      <National />
      <Fastest />
      <Breakfast />
      <Convenience />
      <Grocery />
    </div>
  );
};

export default UserHome;
