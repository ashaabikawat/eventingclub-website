import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Promocode from "../common/promocode/Promocode";
import toast from "react-hot-toast";
import axios from "axios";
import { promocode } from "@/utils/config";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosCloseCircle } from "react-icons/io";

const BookingSummary = ({ handleIncrease, handleDecrease }) => {
  const [promocodes, setPromocodes] = useState([]);
  const { id } = useParams();
  const booking = useSelector((store) => store.booking);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [promoObject, setpromoObject] = useState();
  // console.log("booking", booking);

  const selectedTicket = booking?.selectedTickets?.[0];
  // console.log(booking.totalTickets);

  const totalTickets = booking?.totalTickets;

  const getToken = localStorage.getItem("authToken");
  const cust_id = JSON.parse(getToken)?.cust_id;

  console.log("promoObject", promoObject);

  useEffect(() => {
    fetchPromocodes();
  }, []);

  const fetchPromocodes = async () => {
    const payload = {
      event_id: id,
      customer_id: cust_id,
    };
    console.log(payload);
    try {
      const response = await axios.post(`${promocode.GET_ALL}`, payload);
      console.log(response.data.data);
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
          setLoading(false);
        }
      }
    }
  };

  const handleTermsAndConditions = (id) => {
    setIsOpen(true);
    setSelectedId(id);
    setpromoObject(promocodes?.find((promocode) => promocode._id === id));
  };

  return (
    <>
      <div className="md:px-12 md:mt-10 px-4 mt-4">
        <div className="border border-gray-200 h-auto rounded-lg py-6 px-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm">Step 2</p>
            <h1 className="md:text-2xl text-xl font-bold">Booking Summary</h1>
          </div>
          <div className="border border-gray-200 py-4 px-4 mt-6 rounded-lg flex justify-between ">
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

          <div className="border  border-gray-200 py-4 px-4 mt-6 rounded-lg flex justify-between ">
            <div className="flex  flex-col w-full h-auto gap-4">
              <h1 className="md:font-bold md:text-2xl text-xl">
                Have a promo code?
              </h1>
              <div className="flex justify-between items-center">
                {/* promo code input */}
                <input
                  type="text"
                  placeholder="Enter promo code"
                  className="border border-gray-200 md:px-3 md:py-3 p-2 rounded-lg w-[100%] relative"
                />
                <button className=" md:px-2 px-1 md:placeholder:text-base text-sm  text-blue-900 font-bold md:text-lg absolute md:right-24 border-l-2 border-black right-14 ">
                  Apply
                </button>
              </div>
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
                        slidesPerView: 3,
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
                    {promocodes?.map((promocode) => (
                      <SwiperSlide
                        key={promocode._id}
                        className="w-full"
                        onClick={() => handleTermsAndConditions(promocode._id)}
                      >
                        <Promocode promocode={promocode} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  {/* <Promocode /> */}
                </div>
                {isOpen && (
                  // <>
                  //   <div
                  //     className="fixed inset-0 bg-black opacity-50 z-40"
                  //     aria-hidden="true"
                  //   ></div>

                  // </>
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
    </>
  );
};

export default BookingSummary;
