import React from "react";

const Tickets = ({ ticket }) => {
  return (
    <div className="md:pb-6 pb-4 font-nunito">
      <div className="bg-white rounded-lg h-full p-4 relative border-gray-400  border before:h-8 before:w-8 before:inline-block before:border-r-2 before:border-gray-400  before:rounded-r-full before:absolute before:-left-5 before:bg-gray-50 before:z-100 before:top-16 after:h-8 after:w-8 after:inline-block after:border-l-2 after:border-gray-400  after:rounded-l-full after:absolute after:-right-5 after:bg-gray-50 after:z-100 after:top-16  ">
        <div className="flex justify-between items-start border-b-2 border-gray-200 pb-2">
          <div>
            <p className="font-bold text-black text-lg">{ticket?.Booking_id}</p>
            <div className="flex flex-wrap gap-4  text-sm text-gray-600 mt-2">
              <span>{ticket?.TicketName}</span>
              <span className="relative before:w-1 before:h-1 before:bg-black before:inline-block before:rounded-full before:absolute before:-left-2 before:top-2">
                {ticket?.TicketQuantity} Ticket
              </span>
            </div>
          </div>
          <div>
            <p className=" text-black  px-3 py-1 text-sm font-semibold flex items-center">
              {ticket?.Status}
            </p>
            <p className="border border-gray-400 text-black rounded-md px-3 py-1 text-sm font-semibold flex items-center">
              ₹ {ticket?.TotalAmount}
            </p>
          </div>
        </div>
        <div className="pt-4 ">
          <p className="text-blue-600 font-semibold text-md">
            {ticket?.EventName}
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
            <span>{ticket?.EventDate}</span>
            <span className="relative before:w-1 before:h-1 before:bg-black before:inline-block before:rounded-full before:absolute before:-left-2 before:top-2">
              {ticket?.EventTime}
            </span>
            <span className="relative before:w-1 before:h-1 before:bg-black before:inline-block before:rounded-full before:absolute before:-left-2 before:top-2">
              {ticket?.EventVenue}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
