import { useSelector } from "react-redux";
import { AiOutlineStar } from "react-icons/ai";
import Loading from "../Util/Loading";

const SearchDropdown = ({ ref, input, storeView }) => {
  const stores = useSelector((state) => state.store.store);
  const filteredStores = stores?.filter(({ name }) => {
    if (input === "") {
      return name;
    } else {
      return name.toLowerCase().includes(input);
    }
  });
  if (!stores)
    return (
      <div
        className="h-[35rem] absolute right-[3rem] lg:right-[6rem] w-full md:w-[20rem] lg:w-[23rem]
               border rounded-lg top-[.1rem] z-40 animate-fade bg-white flex items-center"
        ref={ref}
      >
        <Loading />
      </div>
    );
  else
    return (
      <div
        className="md:h-[40rem] h-screen absolute right-[3rem] lg:right-[6rem] w-full md:w-[20rem] lg:w-[23rem]
               border rounded-lg top-[.1rem] z-40 bg-white"
        ref={ref}
      >
        <div
          className="pt-[5rem] pb-[1rem] pl-[4rem] relative md:pl-[1rem] h-screen md:h-[40rem] space-y-3 overflow-y-scroll 
        overscroll-y-contain container-snap z-40 animate-fade"
        >
          {stores &&
            filteredStores.map(
              ({
                id,
                place_id,
                formatted_address,
                opening_hours,
                rating,
                expensive_rating,
                user_ratings_total,
                logo,
                name,
              }) => (
                <div
                  key={place_id}
                  className="h-[4rem] w-full justify-start cursor-pointer"
                  onClick={() =>
                    storeView({
                      id,
                      destinations: formatted_address,
                      place_id,
                      totalRatings: user_ratings_total,
                    })
                  }
                >
                  <div className="flex items-center space-x-3">
                    <div>
                      {" "}
                      <img
                        alt=""
                        src={`../../../${logo}`}
                        className="object-contain max-h-fit max-w-fit w-[3rem] h-[3rem] bg-gray-100 border rounded-full"
                      />
                    </div>
                    <div className="">
                      <div className="font-bold">{name}</div>
                      <div className="line-clamp-1 text-sm">
                        {" "}
                        {formatted_address}
                      </div>
                      <div className="flex items-center text-sm">
                        <div
                          className={`flex items-center ${
                            opening_hours?.open_now
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {opening_hours?.open_now ? "Open" : "Closed"}
                        </div>
                        <div>• {rating} </div>
                        <div>
                          <AiOutlineStar />
                        </div>
                        <div> • {expensive_rating}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
        </div>
      </div>
    );
};

export default SearchDropdown;
