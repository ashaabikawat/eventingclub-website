import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Promocode from "../common/promocode/Promocode";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { promocode } from "@/utils/config";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosCloseCircle } from "react-icons/io";
import {
  handleIncrease,
  handleDecrease,
  setBookingDataObj,
  setPromocodeId,
} from "../../store/slices/booking";

const BookingSummary = ({ handleOpen, isAccordionOpen }) => {
  const [promocodes, setPromocodes] = useState([]);
  const { id } = useParams();
  const booking = useSelector((store) => store.booking);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [promoObject, setpromoObject] = useState();
  const selectedTicket = useSelector((store) => store.booking.selectedTickets);
  const totalTickets = useSelector((store) => store.booking.totalTickets);
  const count = useSelector((store) => store.booking.count);
  const [promocodeValue, setPromocodeValue] = useState("");

  const dispatch = useDispatch();
  const totalTicketsUi = totalTickets;
  const ticket = selectedTicket[0];
  const getToken = localStorage.getItem("authToken");
  const cust_id = JSON.parse(getToken)?.cust_id;

  const [promocodeDiscountPrice, setPromocodeDiscountPrice] = useState(0);

  const ticketAmount = Number(ticket.TicketPrice) * totalTickets;
  const convenienceFee = Number(promocodes?.ConFeeValue) || 0;
  const promocodeDiscount = Number(promocodeDiscountPrice) || 0;

  // Calculate GST based on the total before discount
  const gst = convenienceFee * 0.18;

  // Calculate total amount
  const totalAmount = ticketAmount + convenienceFee + gst - promocodeDiscount;

  const promocodePrice = promoObject?.Value;
  const promocodeDiscountAmount =
    (ticketAmount * Number(promoObject?.Value)) / 100;

  const formatAmount = (amount) => {
    return amount.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleApplyPromocode = () => {
    const selectedPromocode = promocodes?.applicablePromocodes?.find(
      (promo) => promo.PromoCodeName === promocodeValue
    );

    const minAmount = Number(selectedPromocode?.MinAmount);
    const ticketAmountNum = Number(ticketAmount);

    if (!isNaN(minAmount) && !isNaN(ticketAmountNum)) {
      if (minAmount <= ticketAmountNum) {
        setpromoObject(selectedPromocode);
        dispatch(setPromocodeId(selectedPromocode._id));
        toast.success("Promocode applied successfully!");
      } else {
        toast.error(`Minimum checkout amount is ${minAmount}`);
        setPromocodeDiscountPrice(0);
      }
    } else {
      console.log("Invalid amounts:", minAmount, ticketAmountNum);
    }
  };

  useEffect(() => {
    dispatch(
      setBookingDataObj({
        selectedTickets: selectedTicket,
        totalTickets: Object.values(count)[0],
      })
    );
  }, [count]);

  useEffect(() => {
    fetchPromocodes();
  }, []);

  const fetchPromocodes = async () => {
    const payload = {
      event_id: id,
      customer_id: cust_id,
    };
    // console.log(payload);
    try {
      const response = await axios.post(`${promocode.GET_ALL}`, payload);
      // console.log(response.data.data);
      setPromocodes(response.data.data);
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
          // console.log(error.response);
          toast.error(data.message);
          // setLoading(false);
        }
      }
    }
  };

  const handleTermsAndConditions = (id) => {
    setIsOpen(true);
    setSelectedId(id);
    setpromoObject(
      promocodes?.applicablePromocodes?.find(
        (promocode) => promocode._id === id
      )
    );
  };

  useEffect(() => {
    setPromocodeValue(promoObject?.PromoCodeName || "");
    setPromocodeDiscountPrice(
      promoObject?.PromType === 1 ? promocodePrice : promocodeDiscountAmount
    );
  }, [promoObject]);

  return (
    <div>
      <Toaster />
      {Object.keys(count).length > 0 && (
        <div className="border border-gray-200 py-4 px-4 rounded-lg flex justify-between ">
          <div className="flex flex-col gap-2">
            <h1 className="md:text-2xl capitalize">{ticket?.TicketName}</h1>
            {ticket?.TicketDescprition && (
              <p className="text-lg">{ticket?.TicketDescprition}</p>
            )}
            <p className="text-lg">&#8377; {ticket?.TicketPrice}</p>
          </div>
          <div>
            <div>
              {/* delete icon */}
              <div className="flex gap-2 items-center">
                <button
                  className="bg-gray-700 px-3 py-1 rounded text-white"
                  onClick={() => dispatch(handleDecrease(ticket?.Ticket_Id))}
                >
                  -
                </button>
                <span>{Number(totalTicketsUi)}</span>
                <button
                  className="bg-gray-700 px-3 py-1 rounded text-white"
                  onClick={() => dispatch(handleIncrease(ticket?.Ticket_Id))}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="border  border-gray-200 py-4 px-4 mt-6 rounded-lg flex justify-between ">
        <div className="flex  flex-col w-full h-auto gap-4">
          <h1 className="md:font-bold md:text-2xl text-xl">
            Have a promo code?
          </h1>

          {isAccordionOpen && (
            <div className="flex justify-between items-center">
              {/* promo code input */}
              <input
                type="text"
                placeholder="Enter promo code"
                value={promocodeValue}
                onChange={(e) => setPromocodeValue(e.target.value)}
                className="border border-gray-200 md:px-3 md:py-3 p-2 rounded-lg w-[100%] relative"
                disabled
              />
              <button
                onClick={handleApplyPromocode}
                className=" absolute right-6   border-l-2 border-black md:px-2 px-1 md:placeholder:text-base text-sm  text-blue-900 font-bold md:text-lg  "
              >
                Apply
              </button>
            </div>
          )}
          <div>
            <div>
              <Swiper
                // spaceBetween={20}
                // slidesPerView={4}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 6,
                  },
                  425: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 3.5,
                    spaceBetween: 10,
                  },
                }}
              >
                {promocodes?.applicablePromocodes?.map((promocode) => (
                  <SwiperSlide
                    key={promocode._id}
                    className="w-full cursor-pointer"
                    onClick={() => handleTermsAndConditions(promocode._id)}
                  >
                    <Promocode promocode={promocode} />
                  </SwiperSlide>
                ))}
              </Swiper>
              {/* <Promocode /> */}
            </div>
            {isOpen && (
              <>
                <div
                  className="fixed inset-0 bg-black opacity-50 z-40"
                  aria-hidden="true"
                ></div>

                <div
                  id="static-modal"
                  data-modal-backdrop="static"
                  tabIndex="-1"
                  aria-hidden="true"
                  className="fixed inset-0 z-50 flex justify-center items-center w-full h-full"
                >
                  <div className="relative p-4 flex items-center justify-center">
                    {/* <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 text-center ">
                          <div className="relative  ">

                          </div>
                        </div> */}
                    <div className="relative  bg-white rounded-lg shadow dark:bg-gray-700 w-72 md:w-96">
                      <div className=" border border-gray-300 rounded-md px-2 py-4 md:w-full ">
                        <div className="flex justify-between items-center">
                          <div className=" items-center  flex gap-4 ">
                            <input type="radio" className="w-4 h-4" />
                            <label className=" text-blue-900 text-base p-2  rounded-md border border-dashed border-blue-900 font-bold">
                              {promoObject?.PromoCodeName}
                            </label>
                          </div>
                          <button>
                            <IoIosCloseCircle
                              size={25}
                              onClick={() => setIsOpen(false)}
                            />
                          </button>
                        </div>
                        <div>
                          <div className="flex flex-col gap-2 mt-3 pl-8 ">
                            <p className="text-base capitalize  pt-4 border-t-2 border-gray-200 text-blue-900 font-semibold">
                              save &#8377; {promoObject?.Value}
                            </p>
                            <p className="text-xs text-gray-700">
                              {promoObject?.TermsCondition}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="border  border-gray-200 py-4 px-4 mt-6 rounded-lg flex justify-between ">
        <div className="flex  flex-col w-full h-auto gap-4">
          <h1 className="md:font-bold md:text-2xl text-xl">Payment details</h1>
          <div className="flex flex-col gap-1  border-b-2 border-gray-500">
            <div className="flex justify-between">
              <p className="md:text-lg capitalize">Ticket amount</p>
              <p className="md:text-lg font-bold text-green-500">
                &#8377;{formatAmount(ticketAmount)}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="md:text-lg capitalize">convenience fee</p>
              <p className="md:text-lg font-bold flex gap-2 text-green-500">
                <span>+</span>
                &#8377;{formatAmount(convenienceFee)}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="md:text-lg capitalize">promocode</p>
              <p className="md:text-lg font-bold flex gap-2 text-red-500">
                <span>-</span>
                &#8377;
                {/* {promoObject?.PromType === 1
                  ? promocodePrice
                  : promocodeDiscountAmount} */}
                {promocodeDiscountPrice ? promocodeDiscountPrice : 0}
              </p>
            </div>
            <div className="flex justify-between mb-2">
              <p className="md:text-lg capitalize">GST</p>
              <p className="md:text-lg font-bold flex gap-2 text-green-500">
                <span>+</span> &#8377;{formatAmount(gst)}
              </p>
            </div>
          </div>
          <div>
            <div className="flex justify-between">
              <p className="md:text-xl text-lg font-bold capitalize ">
                Total amount
              </p>
              <p className="md:text-lg  font-bold">
                &#8377;{formatAmount(totalAmount)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => handleOpen(3)}
        className="whitespace-nowrap capitalize inline-flex items-center mt-3 justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 md:w-full"
      >
        Continue
      </button>
    </div>
  );
};

export default BookingSummary;
