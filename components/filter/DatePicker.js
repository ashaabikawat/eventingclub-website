import React, { useEffect, useRef, useState } from "react";
import { dropdownOptions, formatDateForInput } from "@/utils/constants";
import Flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";

const DatePicker = ({
  handleDateSelection,
  isManual,
  setIsManual,
  handleManualSubmit,
  range,
  setRange,
  setStartDate,
  setEndDate,
  handleClear,
  setFilterOpenModal,
}) => {
  const startPickerRef = useRef(null);
  const [selectedDates, setSelectedDates] = useState();
  const [today, setToday] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      setToday(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (today) {
      const date = formatDateForInput(today.toLocaleDateString("en-US"));
      setFormattedDate(date);
    }
  }, [today]);

  useEffect(() => {
    let flatpickrInstance;

    if (isManual && startPickerRef.current) {
      flatpickrInstance = Flatpickr(startPickerRef.current, {
        inline: true,
        position: "auto",
        defaultDate: formattedDate,
        onChange: (selectedDates) => {
          setSelectedDates(selectedDates[0]);
          if (range === "start") {
            setStartDate(selectedDates[0]);
          } else {
            setEndDate(selectedDates[0]);
          }
        },
      });
    }

    return () => {
      if (flatpickrInstance) {
        flatpickrInstance.destroy();
      }
    };
  }, [isManual, range]);

  const handleDateRange = (range) => {
    setRange(range);
  };

  return (
    <div className="flex flex-col gap-2 mb-4">
      {/* Options */}
      <div className="flex flex-wrap gap-2">
        {dropdownOptions?.map((options) => (
          <div
            key={options.id}
            className="border border-gray-300 p-2 rounded-md text-black cursor-pointer"
            onClick={() => handleDateSelection(options.Value)}
          >
            {options.Value}
          </div>
        ))}
      </div>

      {/* Date Range Checkbox */}
      <div className="mt-2">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="form-checkbox"
            checked={isManual}
            onChange={() => setIsManual(!isManual)}
          />
          <span className="ml-2 text-black cursor-pointer">Date Range</span>
        </label>
      </div>

      {isManual && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black opacity-50 z-40"></div>

          {/* Centered Calendar Div */}
          <div className="fixed inset-0 flex justify-center items-center z-50 ">
            <div className="bg-white border border-white rounded-lg md:p-6 py-4 shadow-xl max-w-md ">
              <div className="flex gap-8 mb-6 items-center justify-around">
                <span
                  onClick={() => handleDateRange("start")}
                  className={`relative text-xl cursor-pointer text-center ${
                    range === "start" ? "text-blue-900" : ""
                  }`}
                >
                  Start
                  <span
                    className={`absolute left-0 right-0 mx-auto block h-[2px] bg-blue-900 mt-1 transition-transform duration-300 transform ${
                      range === "start" ? "scale-x-150" : "scale-x-0"
                    }`}
                  />
                </span>

                <span
                  onClick={() => handleDateRange("end")}
                  className={`relative text-xl cursor-pointer text-center ${
                    range === "end" ? "text-blue-900" : ""
                  }`}
                >
                  End
                  <span
                    className={`absolute left-0 right-0 mx-auto block h-[2px] bg-blue-900 mt-1 transition-transform duration-300 transform ${
                      range === "end" ? "scale-x-150" : "scale-x-0"
                    }`}
                  />
                </span>
              </div>

              <div
                id="datepicker-start"
                ref={startPickerRef}
                className="shadow-none border-none outline-none"
              ></div>
              <div className="flex gap-6 mt-6 justify-around items-center">
                <button
                  className="text-base border border-gray-400 px-4 py-2 rounded"
                  onClick={() => {
                    handleClear();
                    setIsManual(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleManualSubmit}
                  className="text-white bg-blue-900 px-4 py-2 rounded"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DatePicker;
