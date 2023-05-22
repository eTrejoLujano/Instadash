import { HiChevronDown } from "react-icons/hi";
import BlackDoor from "../../assets/icons/blackDoor.png";
import BlackTag from "../../assets/icons/blackTag.png";
import BlackStar from "../../assets/icons/blackStar.png";

const Filterbar = () => {
  const filters = [
    { id: 1, name: "Cuisines", srcArrow: <HiChevronDown size={24} /> },
    {
      id: 2,
      name: "Delivery Fees: Under $3",
      srcArrow: <HiChevronDown size={24} />,
    },
    { id: 3, name: "Dash Pass", src: BlackDoor },
    { id: 4, name: "Offers", src: BlackTag },
    { id: 5, name: "Pickup" },
    {
      id: 6,
      name: "Over 4.5",
      src: BlackStar,
      srcArrow: <HiChevronDown size={24} />,
    },
    { id: 7, name: "Under 30 min" },
    { id: 8, name: "Price", srcArrow: <HiChevronDown size={24} /> },
  ];
  return (
    <div
      className="h-[4.2rem] text-black border-solid border 
    border-gray-100"
    >
      <div className="scroll-smooth pt-[.9rem] flex flex-row justify-center">
        <div
          className="flex flex-row
         overflow-x-scroll overscroll-x-contain container-snap space-x-3"
        >
          {filters.map(({ id, name, src, srcArrow }) => (
            <div
              key={id}
              className="rounded-full text-sm flex flex-row bg-white 
            space-x-2 cursor-pointer w-auto"
            >
              <div className="rounded-full h-9 w-19 bg-gray-200 flex flex-row px-3 top-2">
                {src && id !== 6 && (
                  <div className="w-5 py-[.45rem]">
                    <img src={src} />
                  </div>
                )}
                <div className="pt-1.5 truncate text-base pr-2 font-semibold">
                  {name}
                </div>
                {src && id === 6 && (
                  <div className="w-4 py-[.5rem]">
                    <img src={src} />
                  </div>
                )}
                {srcArrow && (
                  <div className="py-2">
                    <div className="flex">
                      <div className="text-gray-400">|</div>
                      {srcArrow}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filterbar;
