import { indianLanguages } from "@/utils/constants";
import React, { useState } from "react";

const Languages = ({ handleLanguageSelection }) => {
  const [readMore, setReadMore] = useState(false);

  const commonLang = indianLanguages.slice(0, 8);
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {readMore
        ? indianLanguages.map((lang) => {
            return (
              <div
                className=" border border-gray-300 p-2 rounded-md text-black cursor-pointer"
                onClick={() => handleLanguageSelection(lang.value)}
              >
                {lang.label}
              </div>
            );
          })
        : commonLang.map((lang) => {
            return (
              <div
                className=" border border-gray-300 p-2 rounded-md text-black cursor-pointer"
                onClick={() => handleLanguageSelection(lang.value)}
              >
                {lang.label}
              </div>
            );
          })}
      <p
        className="mt-2  text-sm cursor-pointer"
        onClick={() => setReadMore(true)}
      >
        Read more
      </p>
    </div>
  );
};

export default Languages;
