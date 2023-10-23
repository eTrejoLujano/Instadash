import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as categoriesAPI from "../../Api/categories";

const Categories = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState();
  useEffect(() => {
    async function fetchData() {
      const categories = await categoriesAPI.getCategories();
      setCategory(categories);
    }
    fetchData();
  }, []);
  const categoryView = (id) => {
    navigate("/category", { state: { id: id } });
  };
  return (
    <div
      className="md:h-[8.8rem] relative h-[5rem] text-black bg-gray-100 border-solid border 
    border-gray-100 w-screen"
    >
      <div className="scroll-smooth flex flex-row justify-center">
        <div
          className="flex flex-row items-center
        md:h-[7rem] h-[4.6rem] md:my-11 overflow-x-scroll overscroll-x-contain 
        container-snap space-x-3"
        >
          {category?.map(({ id, name, image }) => (
            <div
              key={id}
              className="rounded-full py-2.5 px-2 text-sm bg-white 
              flex flex-row space-x-2 cursor-pointer"
              onClick={() => categoryView(id)}
            >
              <div className="rounded-full h-9 w-9 bg-sky-100 ">
                <div className="w-9">
                  <img src={image} />
                </div>
              </div>
              <div className="pt-1.5 text-md">{name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
