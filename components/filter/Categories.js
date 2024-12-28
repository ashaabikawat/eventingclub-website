import { categories } from "@/utils/config";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Categories = ({ handleCategory }) => {
  const [category, setCategory] = useState([]);
  const [readMore, setReadMore] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch categories from the API
  const fetchCategories = async () => {
    try {
      const response = await axios.get(categories.GET_ALL);

      setCategory(response.data.data); // Make sure the data format is correct
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        if (
          status === 404 ||
          status === 403 ||
          status === 500 ||
          status === 302 ||
          status === 409 ||
          status === 401 ||
          status === 400
        ) {
          setCategory([]);
        }
      }
    }
  };

  // Function to handle category selection
  const handleCategoryClicked = (id) => {
    setSelectedCategory(id); // Update the selected category state
    handleCategory(id); // Call the parent-provided function
  };

  const startingCategory = category?.slice(0, 10);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="flex flex-wrap gap-2 mb-4 font-Atkinson">
      {readMore
        ? category.map((cat) => {
            return (
              <div
                key={cat._id} // Ensure you're using the correct key from the data
                className={`border border-gray-300 p-2 rounded-md text-black cursor-pointer ${
                  selectedCategory === cat._id ? "bg-blue-900 text-white" : ""
                }`}
                onClick={() => handleCategoryClicked(cat._id)}
              >
                {cat.Name}
              </div>
            );
          })
        : startingCategory.map((cat) => {
            return (
              <div
                key={cat._id}
                className={`border border-gray-300 p-2 rounded-md text-black cursor-pointer ${
                  selectedCategory === cat._id ? "bg-blue-900 text-white" : ""
                }`}
                onClick={() => handleCategoryClicked(cat._id)}
              >
                {cat.Name}
              </div>
            );
          })}
      {category?.length > 10 && (
        <>
          {readMore ? (
            <p
              className="mt-2 text-sm cursor-pointer"
              onClick={() => setReadMore(false)}
            >
              Read Less
            </p>
          ) : (
            <p
              className="mt-2 text-sm cursor-pointer"
              onClick={() => setReadMore(true)}
            >
              Read more
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default Categories;
