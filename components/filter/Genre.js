import axios from "axios";
import React, { useEffect, useState } from "react";
import { genre } from "@/utils/config";

const Genre = ({ handleGenre }) => {
  const [allGenre, setAllGenre] = useState([]);

  useEffect(() => {
    fetchGenre();
  }, []);

  const fetchGenre = async () => {
    try {
      const response = await axios.get(`${genre.GET_ALL}`);
      // console.log(response.data.data);
      setAllGenre(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {allGenre?.map((genre) => (
        <div
          className=" border border-gray-300 p-2 rounded-md text-black cursor-pointer"
          onClick={() => handleGenre(genre._id)}
        >
          {genre.Name}
        </div>
      ))}
    </div>
  );
};

export default Genre;
