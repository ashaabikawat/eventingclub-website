import { categories } from "@/utils/config";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Categories = ({ handleCategory }) => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(categories.GET_ALL);
      console.log(response.data.data);
      setCategory(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {category.map((category) => {
        return (
          <div
            className=" border border-gray-300 p-2 rounded-md text-black cursor-pointer"
            onClick={() => handleCategory(category._id)}
          >
            {category.Name}
          </div>
        );
      })}
    </div>
  );
};

export default Categories;
