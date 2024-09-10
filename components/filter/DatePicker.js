import React, { useState } from "react";

const DatePicker = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [isStartDate, setIsStartDate] = useState(true);

  const toggleDatePicker = (isStart) => {
    setIsStartDate(isStart);
    setShowDatePicker(!showDatePicker);
  };

  const handleDateClick = (day) => {
    if (isStartDate) {
      setSelectedStartDate(day);
    } else {
      setSelectedEndDate(day);
    }
    setShowDatePicker(false);
  };

  const renderCalendarDays = () => {
    const daysInMonth = 28; // Assuming February for simplicity
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    return daysArray.map((day) => (
      <div
        key={day}
        className="w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-gray-200 rounded-lg"
        onClick={() => handleDateClick(day)}
      >
        {day}
      </div>
    ));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Date Range buttons */}
      <div className="flex items-center space-x-4">
        <button
          className="border p-2 rounded-lg"
          onClick={() => toggleDatePicker(true)}
        >
          {selectedStartDate
            ? `Start Date: ${selectedStartDate}`
            : "Start Date"}
        </button>
        <button
          className="border p-2 rounded-lg"
          onClick={() => toggleDatePicker(false)}
        >
          {selectedEndDate ? `End Date: ${selectedEndDate}` : "End Date"}
        </button>
      </div>

      {/* Date Picker Popup */}
      {showDatePicker && (
        <div className="mt-4 p-4 bg-white border rounded-lg shadow-lg relative">
          <h3 className="text-lg mb-2">
            {isStartDate ? "Select Start Date" : "Select End Date"}
          </h3>
          <div className="grid grid-cols-7 gap-2">
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
            <div>Sun</div>
            {renderCalendarDays()}
          </div>
          <div className="flex justify-between mt-4">
            <button
              className="px-4 py-2 bg-gray-200 rounded-lg"
              onClick={() => setShowDatePicker(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              onClick={() => setShowDatePicker(false)}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
