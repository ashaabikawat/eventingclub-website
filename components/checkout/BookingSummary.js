import React from "react";
import { useDispatch, useSelector } from "react-redux";

const BookingSummary = ({ handleIncrease, handleDecrease }) => {
  const booking = useSelector((store) => store.booking);
  console.log("booking", booking);

  const selectedTicket = booking?.selectedTickets?.[0];
  console.log(booking.totalTickets);

  // const counts = selectedTicket.Ticket_Id || 0;
  // console.log(counts);
  return (
    <div className="md:px-12 md:mt-10 px-4 mt-6">
      <div className="border border-gray-400 h-auto rounded-lg py-6 px-4">
        <div className="flex flex-col gap-2">
          <p className="text-sm">Step 2</p>
          <h1 className="text-2xl font-bold">Booking Summary</h1>
        </div>
        <div className="border border-gray-400 py-4 px-4 mt-6 rounded-lg flex justify-between ">
          <div className="flex flex-col gap-2">
            <h1 className="md:text-2xl capitalize">
              {selectedTicket?.TicketName}
            </h1>
            {selectedTicket?.TicketDescprition && (
              <p className="text-lg">{selectedTicket?.TicketDescprition}</p>
            )}
            <p className="text-lg">&#8377; {selectedTicket?.TicketPrice}</p>
          </div>
          <div>
            <div>
              {/* delete icon */}
              <div className="flex gap-2 items-center">
                <button
                  className="bg-gray-700 px-3 py-1 rounded text-white"
                  onClick={() => handleDecrease(selectedTicket?.Ticket_Id)}
                >
                  -
                </button>
                <span>
                  {booking?.totalTickets.length < 1 ? 0 : booking?.totalTickets}
                </span>
                <button
                  className="bg-gray-700 px-3 py-1 rounded text-white"
                  onClick={() => handleIncrease(selectedTicket?.Ticket_Id)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
