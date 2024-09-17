import React from "react";
import { useDispatch, useSelector } from "react-redux";

const BookingSummary = ({ handleIncrease, handleDecrease }) => {
  const booking = useSelector((store) => store.booking);
  console.log("booking", booking);

  const selectedTicket = booking?.selectedTickets?.[0];
  // console.log(booking.totalTickets);

  const totalTickets = booking?.totalTickets;

  return (
    <div className="md:px-12 md:mt-10 px-4 mt-4">
      <div className="border border-gray-400 h-auto rounded-lg py-6 px-4">
        <div className="flex flex-col gap-2">
          <p className="text-sm">Step 2</p>
          <h1 className="md:text-2xl text-xl font-bold">Booking Summary</h1>
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
                <span>{Number(totalTickets)}</span>
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

        <div className="border  border-gray-400 py-4 px-4 mt-6 rounded-lg flex justify-between ">
          <div className="flex  flex-col w-full h-auto gap-4">
            <h1 className="md:font-bold md:text-2xl text-xl">
              Have a promo code?
            </h1>
            <div className="flex justify-between items-center">
              {/* promo code input */}
              <input
                type="text"
                placeholder="Enter promo code"
                className="border border-gray-400 md:px-3 md:py-3 p-2 rounded-lg w-[100%] relative"
              />
              <button className=" md:px-2 px-1 md:placeholder:text-base text-sm  text-blue-900 font-bold md:text-lg absolute md:right-24 border-l-2 border-black right-14 ">
                Apply
              </button>
            </div>
            <div>{/* coupon codes */}</div>
          </div>
        </div>

        <div className="border  border-gray-400 py-4 px-4 mt-6 rounded-lg flex justify-between ">
          <div className="flex  flex-col w-full h-auto gap-4">
            <h1 className="md:font-bold md:text-2xl text-xl">
              Payment details
            </h1>
            <div className="flex flex-col gap-1  border-b-2 border-gray-500">
              <div className="flex justify-between">
                <p className="md:text-lg capitalize">Ticket amount</p>
                <p className="md:text-lg font-bold">&#8377; 500</p>
              </div>
              <div className="flex justify-between">
                <p className="md:text-lg capitalize">convenience fee</p>
                <p className="md:text-lg font-bold">&#8377; 100</p>
              </div>
              <div className="flex justify-between">
                <p className="md:text-lg capitalize">promocode</p>
                <p className="md:text-lg font-bold">&#8377; 100</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="md:text-lg capitalize">GST</p>
                <p className="md:text-lg font-bold">&#8377; 100</p>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <p className="md:text-xl text-lg font-bold capitalize ">
                  Total amount
                </p>
                <p className="md:text-lg  font-bold">&#8377; 500</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
