"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Promocode from "../common/promocode/Promocode";
import toast from "react-hot-toast";
import axios from "axios";
import { bookTicketApi, promocode } from "@/utils/config";
import { useParams, useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosCloseCircle } from "react-icons/io";
import Link from "next/link";
// Redux actions for managing booking state
import {
  setBookingDataObj,
  setPromocodeId,
  setPromcodeDiscountAmount,
  remove_promocode,
  setTicketId,
  setTicketCounts,
  reset_state,
} from "../../store/slices/booking";
import { decryptData, encryptData } from "@/utils/constants";

const BookingSummary = () => {
  const passphrase = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
  const bookingData = decryptData(
    useSelector((store) => store.bz8v2.z1x0),
    passphrase
  );
  const totalTickets = bookingData?.e5f6;

  // console.log(totalTickets);

  // console.log("bookingData", bookingData);
  const [quantity, setQuanity] = useState(totalTickets);
  const [promocodes, setPromocodes] = useState([]);
  const { id } = useParams();

  // State to manage whether the terms and conditions modal is open
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const promocodeId = decryptData(
    useSelector((store) => store.bz8v2.i9j0),
    passphrase
  );
  // console.log(promocodeId);
  const [promoObject, setpromoObject] = useState();
  const [promocodeValue, setPromocodeValue] = useState("");

  const selectedTicket = bookingData?.c3d4;
  // console.log(selectedTicket);

  const PromocodeIdFromLs = decryptData(
    useSelector((store) => store.bz8v2.i9j0),
    passphrase
  );

  const router = useRouter();

  const dispatch = useDispatch();
  const totalTicketsUi = totalTickets;
  const ticket = selectedTicket[0];

  const ticketAmount = Number(ticket?.TicketPrice) * totalTickets;

  const cust_id = decryptData(
    useSelector((store) => store.uSess.xA1),
    passphrase
  );
  // console.log("cust_id", cust_id);

  const promocodeDiscountPrice = decryptData(
    useSelector((store) => store.bz8v2.s9t0),
    passphrase
  );
  console.log("promocodeDiscountPrice", promocodeDiscountPrice);

  // const [promocodeDiscountPrice, setPromocodeDiscountPrice] = useState(() => {
  //   return promocodeDiscountAmountStore ? promocodeDiscountAmountStore : 0;
  // });

  // const confee = JSON.parse(localStorage.getItem("convenienceFee"));

  const confee = decryptData(
    useSelector((store) => store.bz8v2.m3n4),
    passphrase
  );
  // console.log(confee);
  const convenienceFee = Number(confee?.ConValue) || 0;

  // Calculate GST based on the total before discount
  const gst = convenienceFee * 0.18;

  // Calculate total amount
  const promocodePrice = promoObject?.Value ? promoObject?.Value : 0;
  const promocodeDiscountAmount =
    (ticketAmount * Number(promoObject?.Value)) / 100;

  console.log("promocodeDiscountAmount", promocodeDiscountAmount);

  const totalAmount = promocodePrice
    ? promoObject?.PromType === 1
      ? ticketAmount + convenienceFee + gst - promocodePrice
      : ticketAmount + convenienceFee + gst - promocodeDiscountAmount
    : ticketAmount + convenienceFee + gst;

  // Amount format function
  const formatAmount = (amount) => {
    return amount.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // // encrypt function
  // const encryptData = (data) => {
  //   return CryptoJS.AES.encrypt(JSON.stringify(data), passphrase).toString();
  // };

  // // Decryption function
  // const decryptData = (encryptedData) => {
  //   const bytes = CryptoJS.AES.decrypt(encryptedData, passphrase);
  //   return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  // };

  useEffect(() => {
    if (promocodes?.applicablePromocodes) {
      const selectedPromocode = promocodes.applicablePromocodes.find(
        (promo) => promo._id === PromocodeIdFromLs
      );
      setpromoObject(selectedPromocode);
    }
  }, [PromocodeIdFromLs, promocodes]);

  // useEffect(() => {
  //   handleApplyPromocode();
  // }, [ticketAmount]);

  console.log("promoobject", promoObject);

  const handleApplyPromocode = async () => {
    toast.dismiss();

    const payload = {
      event_id: id,
      customer_id: cust_id,
      promocode_name: promocodeValue,
    };

    try {
      const response = await axios.post(`${promocode.GET_ALL}`, payload);

      if (response.data.data) {
        const promoData = response.data.data; // Store response in a variable
        setpromoObject(promoData);

        const minAmount = Number(promoData.MinAmount);
        const ticketAmountNum = Number(ticketAmount);

        if (
          !isNaN(minAmount) &&
          !isNaN(ticketAmountNum) &&
          minAmount <= ticketAmountNum
        ) {
          dispatch(setPromocodeId(promoData._id));

          // Calculate the discount price based on type
          const promocodeDiscountAmount =
            (ticketAmountNum * Number(promoData.Value)) / 100;
          const discountPrice =
            promoData.PromType === 1
              ? promoData.PromocodePrice
              : promocodeDiscountAmount;

          dispatch(setPromcodeDiscountAmount(discountPrice));

          toast.success("Promocode applied successfully!");
        } else {
          toast.error(`Minimum amount required: ₹${minAmount}`);
        }
      } else {
        toast.error("Invalid promocode.");
      }
    } catch (error) {
      if (error.response) {
        const { status } = error.response;

        if ([400, 401, 302, 403, 404, 409, 500].includes(status)) {
          toast.error("Failed to apply promocode. Please try again.");
        }
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const handleDecreaseTicket = (id) => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuanity(newQuantity);
      const ticketAmount = Number(selectedTicket[0]?.TicketPrice) * newQuantity;

      dispatch(
        setBookingDataObj({
          e5f6: newQuantity,
          a1b2: ticketAmount,
          c3d4: selectedTicket,
        })
      );

      const updatedCounts = { [id]: newQuantity };
      // localStorage.setItem("ticketCounts", JSON.stringify(updatedCounts));
      dispatch(setTicketCounts(updatedCounts));
    } else if (quantity === 1) {
      setQuanity(0);

      // localStorage.removeItem("ticketCounts");
      // dispatch(setTicketCounts({}));
      // dispatch(setEventId(null));
      // dispatch(setTicketId(null));
      dispatch(reset_state());
    }
  };

  const handleIncrease = (id) => {
    toast.dismiss();
    const bookingLimit = bookingData.c3d4[0].BookingMaxLimit;
    if (quantity < bookingLimit) {
      const newQuanity = quantity + 1;
      setQuanity(newQuanity);
      const ticketAmount = Number(selectedTicket[0]?.TicketPrice) * newQuanity;
      const updatedAmount = ticketAmount;

      dispatch(
        setBookingDataObj({
          e5f6: newQuanity,
          a1b2: updatedAmount,
          c3d4: selectedTicket,
        })
      );
      const updatedCounts = { [id]: newQuanity };
      // localStorage.setItem("ticketCounts", JSON.stringify(updatedCounts));
      dispatch(setTicketCounts(updatedCounts));
    } else {
      toast.error("Booking limit reached");
    }
  };

  // useEffect(() => {
  //   fetchPromocodes();
  // }, []);

  // const fetchPromocodes = async () => {
  //   const payload = {
  //     event_id: id,
  //     customer_id: cust_id,
  //   };

  //   try {
  //     const response = await axios.post(`${promocode.GET_ALL}`, payload);

  //     setPromocodes(response.data.data);
  //   } catch (error) {
  //     if (error.response) {
  //       const { status, data } = error.response;

  //       if (
  //         status === 404 ||
  //         status === 403 ||
  //         status === 500 ||
  //         status === 302 ||
  //         status === 409 ||
  //         status === 401 ||
  //         status === 400
  //       ) {
  //       }
  //     }
  //   }
  // };

  const bookTicket = async () => {
    const payload = {
      customer_id: cust_id,
      event_id: id,
      EventTicket_id: selectedTicket[0]?.Ticket_Id,
      TicketQuantity: totalTickets,
    };
    // if (promocodeId) payload.Promocode_id = promocodeId;

    const encryptedPayload = encryptData(JSON.stringify(payload), passphrase);

    // console.log(payload);
    try {
      const response = await axios.post(`${bookTicketApi.POST_DATA}`, {
        string: encryptedPayload,
      });

      const data = decryptData(response.data.data, passphrase);
      // console.log(data);

      const form = document.createElement("form");
      form.setAttribute("method", "POST");
      form.setAttribute("action", "https://secure.payu.in/_payment");

      Object.keys(data).forEach((key) => {
        const hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", data[key]);
        form.appendChild(hiddenField);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (error) {}
  };

  const handleTermsAndConditions = (id) => {
    setIsOpen(true);
    setSelectedId(id);
    // setpromoObject(
    //   promocodes?.applicablePromocodes?.find(
    //     (promocode) => promocode._id === id
    //   )
    // );
  };

  useEffect(() => {
    const storedBookingData = localStorage.getItem("bookingData");

    // Check if storedBookingData is not null and is a valid JSON string
    if (storedBookingData) {
      try {
        const parsedData = JSON.parse(storedBookingData);

        // Check if parsedData is an array before using it
        if (Array.isArray(parsedData)) {
          dispatch(
            setBookingDataObj({
              c3d4: parsedData,
              e5f6: parsedData.length,
            })
          );
        }
      } catch (error) {
        console.error("Failed to parse stored booking data:", error);
        // Optionally, you can clear the corrupted data from localStorage
        localStorage.removeItem("bookingData");
      }
    }
  }, []);

  useEffect(() => {
    setPromocodeValue(promoObject?.PromoCodeName || "");
  }, [promoObject]);

  const baseAmount = convenienceFee + gst;
  // console.log(promocodeValue);

  return (
    <div className="font-Atkinson">
      {selectedTicket.length > 0 ? (
        <>
          <div className="border border-gray-200 py-4 px-4 rounded-lg flex justify-between gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="md:text-2xl text-xl font-bold capitalize">
                {ticket?.TicketName}
              </h1>
              {ticket?.TicketDescprition && (
                <p className="md:text-base text-xs md:w-full w-44 leading-relaxed  ">
                  {" "}
                  {ticket?.TicketDescprition?.split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </p>
              )}
              <p className="text-base">&#8377; {ticket?.TicketPrice}</p>
            </div>
            <div>
              <div>
                {/* delete icon */}
                <div className="flex gap-2 items-center">
                  <button
                    className="bg-blue-900 px-3 py-1 rounded text-white"
                    onClick={() => handleDecreaseTicket(ticket?.Ticket_Id)}
                  >
                    -
                  </button>
                  <span>{Number(totalTicketsUi)}</span>
                  <button
                    className="bg-blue-900 px-3 py-1 rounded text-white"
                    onClick={() => handleIncrease(ticket?.Ticket_Id)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
          {console.log(promocodeValue)}

          <div className="border  border-gray-200 py-4 px-4 mt-6 rounded-lg flex justify-between ">
            <div className="flex  flex-col w-full h-auto gap-4">
              <h1 className="md:font-bold md:text-2xl text-xl">
                Have a PromoCode?
              </h1>

              <div className="flex justify-between items-center">
                {/* promo code input */}
                <input
                  type="text"
                  placeholder="Enter promocode"
                  value={promocodeValue}
                  onChange={(e) => {
                    setpromoObject(null);
                    setPromocodeValue(e.target.value);
                  }}
                  className="border border-gray-200 md:px-3 md:py-3 p-2 rounded-lg w-[100%] relative"
                  // disabled
                />
                <button
                  onClick={() => {
                    dispatch(remove_promocode());
                    dispatch(setPromcodeDiscountAmount(0));
                    setPromocodeValue("");
                    // localStorage.removeItem("promocodeDiscountAmount");
                  }}
                  className=" absolute md:right-24  right-20 md:px-2 px-1 md:placeholder:text-base text-sm  text-blue-900 font-bold md:text-lg  "
                >
                  X
                </button>
                <button
                  onClick={handleApplyPromocode}
                  className=" absolute right-6   border-l-2 border-black md:px-2 px-1 md:placeholder:text-base text-sm  text-blue-900 font-bold md:text-lg  "
                >
                  Apply
                </button>
              </div>

              <div>
                <div>
                  <Swiper
                    breakpoints={{
                      320: {
                        slidesPerView: 1,
                        spaceBetween: 6,
                      },
                      375: {
                        slidesPerView: 1.2,
                        spaceBetween: 6,
                      },
                      425: {
                        slidesPerView: 1.4,
                        spaceBetween: 10,
                      },
                      480: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                      },
                      768: {
                        slidesPerView: 2.6,
                        spaceBetween: 6,
                      },
                      1024: {
                        slidesPerView: 3.8,
                        spaceBetween: 10,
                      },
                      1440: {
                        slidesPerView: 5.6,
                        spaceBetween: 12,
                      },
                    }}
                  >
                    {promocodes?.applicablePromocodes?.map((promocode) => (
                      <SwiperSlide
                        key={promocode?._id}
                        className="w-full cursor-pointer"
                        onClick={() => handleTermsAndConditions(promocode?._id)}
                      >
                        <Promocode
                          promocode={promocode}
                          selectedId={PromocodeIdFromLs}
                          setpromoObject={setpromoObject}
                        />
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
                        <div className="relative  bg-white rounded-lg shadow dark:bg-gray-700 w-72 md:w-96">
                          <div className=" border border-gray-300 rounded-md px-2 py-4 md:w-full ">
                            <div className="flex justify-between items-center">
                              <div className=" items-center  flex gap-4 ">
                                <label className=" text-blue-900 text-base p-2 md:ml-8 rounded-md border border-dashed border-blue-900 font-bold">
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
                                  {promoObject?.PromType === Number(1)
                                    ? `save ₹ ${promoObject?.Value}`
                                    : `save ${promoObject?.Value}%`}
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
              <h1 className="font-bold md:text-2xl text-xl">Payment details</h1>
              <div className="flex flex-col gap-1  border-b-2 border-gray-500 pb-2">
                <div className="flex justify-between">
                  <p className="text-base md:text-lg capitalize">
                    Ticket amount
                  </p>
                  <p className="text-base md:text-lg font-bold text-green-500">
                    &#8377;{formatAmount(ticketAmount)}
                  </p>
                </div>

                {promocodeValue && (
                  <div className="flex justify-between">
                    <p className="md:text-lg text-base capitalize">promocode</p>
                    <p className="md:text-lg text-base font-bold flex gap-2 text-red-500">
                      <span>-</span>
                      &#8377;
                      {promocodePrice
                        ? promoObject?.PromType === 1
                          ? promocodePrice
                          : promocodeDiscountAmount
                        : 0}
                    </p>
                  </div>
                )}

                {convenienceFee > 0 && (
                  <div>
                    <div className="flex justify-between">
                      <p className="md:text-lg text-base capitalize">
                        convenience fee
                      </p>
                      <p className="md:text-lg text-base font-bold flex gap-2 text-green-500">
                        <span>+</span>
                        &#8377;{formatAmount(baseAmount)}
                      </p>
                    </div>

                    <div className="flex justify-between">
                      <p className="text-sm capitalize text-gray-500">
                        Base amount
                      </p>
                      <p className="text-sm flex gap-2 text-gray-500">
                        &#8377;{formatAmount(convenienceFee)}
                      </p>
                    </div>

                    <div className="flex justify-between mb-2">
                      <p className="text-sm capitalize text-gray-500">
                        platform fee
                      </p>
                      <p className="text-sm  flex gap-2 text-gray-500">
                        &#8377;{formatAmount(gst)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <div className="flex justify-between">
                  <p className="md:text-xl text-lg font-bold capitalize ">
                    Total amount
                  </p>
                  <p className="md:text-lg text-base font-bold">
                    &#8377;{formatAmount(totalAmount)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-4 text-xs md:text-sm leading-relaxed ">
            As you click on 'Continue,' you agree to our{" "}
            <span className="underline cursor-pointer">
              <Link href="/privacy-policy">Privacy Policy</Link>
            </span>{" "}
            and{" "}
            <span className="underline cursor-pointer">
              <Link href="/terms-&-conditions">Terms of Service</Link>
            </span>
            .
          </p>
          <button
            onClick={bookTicket}
            className="whitespace-nowrap capitalize inline-flex items-center mt-6 justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 w-full"
          >
            Continue
          </button>
        </>
      ) : (
        <div className="flex flex-col gap-4 items-center">
          <p className="md:text-lg font-semibold text-black">
            You don't have any tickets
          </p>
          <button
            className="bg-blue-900 text-white py-2 px-14 rounded"
            onClick={() => {
              dispatch(setTicketId(null));
              router.push("/");
            }}
          >
            Back to main page
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingSummary;
