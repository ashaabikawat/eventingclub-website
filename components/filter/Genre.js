import axios from "axios";
import React, { useEffect, useState } from "react";
import { genre } from "@/utils/config";

const Genre = ({ handleGenre }) => {
  const [allGenre, setAllGenre] = useState([]);
  const [readMore, setReadMore] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);

  const startingGenre = allGenre?.slice(0, 10);

  useEffect(() => {
    fetchGenre();
  }, []);

  const fetchGenre = async () => {
    try {
      const response = await axios.get(`${genre.GET_ALL}`);
      setAllGenre(response.data.data);
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
          setAllGenre([]);
        }
      }
    }
  };

  const handleGenreClicked = (id) => {
    setSelectedGenre(id);
    handleGenre(id);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4 nunito">
      {readMore
        ? allGenre.map((genre) => {
            return (
              <div
                key={genre._id}
                className={`border border-gray-300 p-2 rounded-md text-black cursor-pointer ${
                  selectedGenre === genre._id ? "bg-blue-900 text-white" : ""
                }`}
                onClick={() => handleGenreClicked(genre._id)}
              >
                {genre.Name}
              </div>
            );
          })
        : startingGenre.map((genre) => {
            return (
              <div
                key={genre._id}
                className={`border border-gray-300 p-2 rounded-md text-black cursor-pointer ${
                  selectedGenre === genre._id ? "bg-blue-900 text-white" : ""
                }`}
                onClick={() => handleGenreClicked(genre._id)}
              >
                {genre.Name}
              </div>
            );
          })}
      {allGenre?.length > 10 && (
        <>
          {readMore ? (
            <p
              className="mt-2  text-sm cursor-pointer"
              onClick={() => setReadMore(false)}
            >
              Read Less
            </p>
          ) : (
            <p
              className="mt-2  text-sm cursor-pointer"
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

export default Genre;
