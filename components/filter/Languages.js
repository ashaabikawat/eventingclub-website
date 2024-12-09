import { indianLanguages } from "@/utils/constants";
import React, { useState } from "react";

const Languages = ({ handleLanguageSelection }) => {
  const [readMore, setReadMore] = useState(false);
  const [selectedLang, setSelectedLang] = useState(null);

  // Handling language selection
  const handleLangClicked = (id) => {
    setSelectedLang(id);
    handleLanguageSelection(id); // Passing the selected language ID to the parent
  };

  const commonLang = indianLanguages.slice(0, 10);

  return (
    <div className="flex flex-wrap gap-2 mb-4 font-nunito">
      {readMore
        ? indianLanguages.map((lang) => {
            return (
              <div
                key={lang.value} // Using lang.value consistently as the key
                className={`border border-gray-300 p-2 rounded-md text-black cursor-pointer ${
                  selectedLang === lang.value ? "bg-blue-900 text-white" : ""
                }`}
                onClick={() => handleLangClicked(lang.value)}
              >
                {lang.label}
              </div>
            );
          })
        : commonLang.map((lang) => {
            return (
              <div
                key={lang.value}
                className={`border border-gray-300 p-2 rounded-md text-black cursor-pointer ${
                  selectedLang === lang.value ? "bg-blue-900 text-white" : ""
                }`}
                onClick={() => handleLangClicked(lang.value)}
              >
                {lang.label}
              </div>
            );
          })}
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
    </div>
  );
};

export default Languages;
