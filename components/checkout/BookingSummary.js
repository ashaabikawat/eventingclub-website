"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Promocode from "../common/promocode/Promocode";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { bookTicketApi, promocode } from "@/utils/config";
import { useParams, useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosCloseCircle } from "react-icons/io";
import CryptoJS from "crypto-js";

import {
  handleIncrease,
  handleDecrease,
  setBookingDataObj,
  setPromocodeId,
  reset_bookingData,
  remove_promocode,
  setTicketId,
} from "../../store/slices/booking";

const BookingSummary = ({ handleOpen }) => {
  const totalTickets = useSelector(
    (store) => store.booking.bookingData.totalTickets
  );
  const [quantity, setQuanity] = useState(totalTickets);
  const [promocodes, setPromocodes] = useState([]);
  const { id } = useParams();
  const booking = useSelector((store) => store.booking);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const promocodeId = useSelector((store) => store.booking.promocodeId);

  const [promoObject, setpromoObject] = useState();

  const selectedTicket = useSelector(
    (store) => store.booking.bookingData.selectedTickets
  );
  // console.log(selectedTicket);

  const bookingData = useSelector((store) => store.booking.bookingData);
  const PromocodeIdFromLs = useSelector((store) => store.booking.promocodeId);
  // console.log(PromocodeIdFromLs);

  const router = useRouter();

  // console.log(
  //   "bookingdata",
  //   useSelector((store) => store.booking.bookingData)
  // );

  const [promocodeValue, setPromocodeValue] = useState("");
  const passphrase = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;

  // encrypt data
  const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), passphrase).toString();
  };

  // Decryption function
  const decryptData = (encryptedData) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, passphrase);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  };

  const dispatch = useDispatch();
  const totalTicketsUi = totalTickets;
  const ticket = selectedTicket[0];
  const ticketAmount = Number(ticket?.TicketPrice) * totalTickets;
  const getToken = localStorage.getItem("authToken");
  const cust_id = JSON.parse(getToken)?.cust_id;

  const [promocodeDiscountPrice, setPromocodeDiscountPrice] = useState(() => {
    const savedPromocode = localStorage.getItem("promocodeDiscountAmount");
    return savedPromocode ? JSON.parse(savedPromocode) : 0;
  });

  // console.log(promocodeDiscountPrice);
  // const [promocodeDiscountPrice, setPromocodeDiscountPrice] = useState(0);

  const confee = JSON.parse(localStorage.getItem("convenienceFee"));
  // console.log(confee);

  const convenienceFee = Number(confee?.ConValue) || 0;
  const promocodeDiscount = 0;
  // const promocodeDiscount = Number(confee?.ConfeeUnit) || 0;

  // Calculate GST based on the total before discount
  const gst = convenienceFee * 0.18;

  // Calculate total amount
  const totalAmount =
    ticketAmount + convenienceFee + gst - promocodeDiscountPrice;

  const promocodePrice = promoObject?.Value;
  const promocodeDiscountAmount =
    (ticketAmount * Number(promoObject?.Value)) / 100;

  const formatAmount = (amount) => {
    return amount.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  useEffect(() => {
    if (promocodes?.applicablePromocodes) {
      const selectedPromocode = promocodes.applicablePromocodes.find(
        (promo) => promo._id === PromocodeIdFromLs
      );
      setpromoObject(selectedPromocode);
      // console.log("selectedPromocode", selectedPromocode);
    }
  }, [PromocodeIdFromLs, promocodes]);

  const handleApplyPromocode = () => {
    const selectedPromocode = promocodes?.applicablePromocodes?.find(
      (promo) => promo.PromoCodeName === promocodeValue
    );

    const minAmount = Number(selectedPromocode?.MinAmount);
    const ticketAmountNum = Number(ticketAmount);
    // console.log(ticketAmount);

    if (!isNaN(minAmount) && !isNaN(ticketAmountNum)) {
      if (minAmount <= ticketAmountNum) {
        setpromoObject(selectedPromocode);
        dispatch(setPromocodeId(selectedPromocode._id));

        const discountPrice =
          promoObject?.PromType === 1
            ? promocodePrice
            : promocodeDiscountAmount;

        setPromocodeDiscountPrice(discountPrice);
        localStorage.setItem("promocodeDiscountAmount", discountPrice);
        toast.success("Promocode applied successfully!");
      } else {
        toast.error(`Minimum checkout amount is ${minAmount}`);
        setPromocodeDiscountPrice(0);
      }
    } else {
      // console.log("Invalid amounts:", minAmount, ticketAmountNum);
    }
  };
  // console.log(promocodeDiscountPrice);
  // const handleDecreaseTicket = (id) => {
  //   console.log(id);
  //   console.log(bookingData);
  //   if (quantity > 1) {
  //     const newQuanity = quantity - 1;
  //     setQuanity(newQuanity);
  //     const ticketAmount = Number(selectedTicket[0]?.TicketPrice) * newQuanity;
  //     const updatedAmount = ticketAmount;
  //     console.log(newQuanity);
  //     dispatch(
  //       setBookingDataObj({
  //         selectedTickets: selectedTicket,
  //         totalPrice: updatedAmount,
  //         totalTickets: newQuanity,
  //       })
  //     );
  //     const updatedCounts = { [id]: newQuanity };
  //     localStorage.setItem("ticketCounts", JSON.stringify(updatedCounts));
  //   } else {
  //     dispatch(reset_bookingData());
  //   }
  // };

  const handleDecreaseTicket = (id) => {
    // console.log(id);
    // console.log(bookingData);

    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuanity(newQuantity);
      const ticketAmount = Number(selectedTicket[0]?.TicketPrice) * newQuantity;

      dispatch(
        setBookingDataObj({
          selectedTickets: selectedTicket,
          totalPrice: ticketAmount,
          totalTickets: newQuantity,
        })
      );

      const updatedCounts = { [id]: newQuantity };
      localStorage.setItem("ticketCounts", JSON.stringify(updatedCounts));
    } else if (quantity === 1) {
      setQuanity(0);
      dispatch(reset_bookingData());

      localStorage.removeItem("ticketCounts");
    }
  };

  const handleIncrease = (id) => {
    // console.log(id);
    const bookingLimit = bookingData.selectedTickets[0].BookingMaxLimit;
    if (quantity < bookingLimit) {
      const newQuanity = quantity + 1;
      setQuanity(newQuanity);
      const ticketAmount = Number(selectedTicket[0]?.TicketPrice) * newQuanity;
      const updatedAmount = ticketAmount;

      dispatch(
        setBookingDataObj({
          selectedTickets: selectedTicket,
          totalPrice: updatedAmount,
          totalTickets: newQuanity,
        })
      );
      const updatedCounts = { [id]: newQuanity };
      localStorage.setItem("ticketCounts", JSON.stringify(updatedCounts));
    } else {
      toast.error("Booking limit reached");
    }
  };

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
          // toast.error(data.message);
          // setLoading(false);
        }
      }
    }
  };

  const bookTicket = async () => {
    const payload = {
      customer_id: cust_id,
      event_id: id,
      EventTicket_id: selectedTicket[0]?.Ticket_Id,
      TicketQuantity: totalTickets,

      //Optional Feilds

      // customer_Country: "India",
      // customer_CountryIsoCode: "IN",
    };
    if (promocodeId) payload.Promocode_id = promocodeId;
    // if (formData.address) payload.customer_Address = formData?.address;

    // if (formData.pincode) payload.customer_Pincode = formData?.pincode;
    // if (address?.stateName) payload.customer_State = String(address?.stateName);

    // if (address?.stateIsoCode)
    //   payload.customer_StateIsoCode = String(address?.stateIsoCode);

    // if (address?.cityName) payload.customer_City = address?.cityName;

    // console.log(payload);

    const encryptedPayload = encryptData(JSON.stringify(payload));
    // console.log(encryptedPayload);
    try {
      const response = await axios.post(`${bookTicketApi.POST_DATA}`, {
        string: encryptedPayload,
      });
      // console.log(response.data);
      // toast.success(response.data.message);
      // const decryptedData = decryptData(response.data.data);
      const data = decryptData(response.data.data);
      // console.log(data);

      const form = document.createElement("form");
      form.setAttribute("method", "POST");
      form.setAttribute("action", "https://test.payu.in/_payment");

      Object.keys(data).forEach((key) => {
        const hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", data[key]);
        form.appendChild(hiddenField);
      });

      document.body.appendChild(form);
      form.submit();
      // dispatch(reset_state());
    } catch (error) {
      // console.log(error);
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
    const storedBookingData = localStorage.getItem("bookingData");

    // Check if storedBookingData is not null and is a valid JSON string
    if (storedBookingData) {
      try {
        const parsedData = JSON.parse(storedBookingData);

        // Check if parsedData is an array before using it
        if (Array.isArray(parsedData)) {
          dispatch(
            setBookingDataObj({
              selectedTickets: parsedData,
              totalTickets: parsedData.length,
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

  return (
    <div>
      {/* <Toaster /> */}
      {selectedTicket.length > 0 ? (
        <>
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
                    onClick={() => handleDecreaseTicket(ticket?.Ticket_Id)}
                  >
                    -
                  </button>
                  <span>{Number(totalTicketsUi)}</span>
                  <button
                    className="bg-gray-700 px-3 py-1 rounded text-white"
                    onClick={() => handleIncrease(ticket?.Ticket_Id)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {promocodes?.applicablePromocodes?.length > 0 && (
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
                    onChange={(e) => setPromocodeValue(e.target.value)}
                    className="border border-gray-200 md:px-3 md:py-3 p-2 rounded-lg w-[100%] relative"
                    disabled
                  />
                  <button
                    onClick={() => {
                      dispatch(remove_promocode());
                      setPromocodeDiscountPrice(0);
                      localStorage.removeItem("promocodeDiscountAmount");
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
                      // spaceBetween={20}
                      // slidesPerView={6}
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
                          onClick={() =>
                            handleTermsAndConditions(promocode?._id)
                          }
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
                          {/* <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 text-center ">
                          <div className="relative  ">

                          </div>
                        </div> */}
                          <div className="relative  bg-white rounded-lg shadow dark:bg-gray-700 w-72 md:w-96">
                            <div className=" border border-gray-300 rounded-md px-2 py-4 md:w-full ">
                              <div className="flex justify-between items-center">
                                <div className=" items-center  flex gap-4 ">
                                  {/* <input type="radio" className="w-4 h-4" /> */}
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
          )}

          <div className="border  border-gray-200 py-4 px-4 mt-6 rounded-lg flex justify-between ">
            <div className="flex  flex-col w-full h-auto gap-4">
              <h1 className="md:font-bold md:text-2xl text-xl">
                Payment details
              </h1>
              <div className="flex flex-col gap-1  border-b-2 border-gray-500">
                <div className="flex justify-between">
                  <p className="md:text-lg capitalize">Ticket amount</p>
                  <p className="md:text-lg font-bold text-green-500">
                    &#8377;{formatAmount(ticketAmount)}
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

                <div className="flex justify-between">
                  <p className="md:text-lg capitalize">convenience fee</p>
                  <p className="md:text-lg font-bold flex gap-2 text-green-500">
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
                  <p className="text-sm capitalize text-gray-500">GST</p>
                  <p className="text-sm  flex gap-2 text-gray-500">
                    &#8377;{formatAmount(gst)}
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
            onClick={bookTicket}
            className="whitespace-nowrap capitalize inline-flex items-center mt-3 justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 md:w-full"
          >
            Continue
          </button>
        </>
      ) : (
        <div className="flex flex-col gap-4 items-center">
          <p className="md:text-lg font-semibold text-black">
            You dont have any tickets
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

// // Use the same encryption key from the environment or a secure source
// const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY; // Same 32-byte key as in the backend
// const IV_LENGTH = 16;

// // Function to encrypt data on the frontend
// const encryptData = (data) => {
//   const iv = crypto.randomBytes(IV_LENGTH);
//   const cipher = crypto.createCipheriv(
//     "aes-256-cbc",
//     Buffer.from(ENCRYPTION_KEY, "hex"),
//     iv
//   );

//   let encrypted = cipher.update(data, "utf8", "hex");
//   encrypted += cipher.final("hex");

//   return {
//     iv: iv.toString("hex"), // Send IV along with the encrypted data
//     encryptedData: encrypted,
//   };
// };
