"use client";

import {
  setMobileNumber,
  setAuthDetails,
  setIsNewCustomer,
  setToken,
  loggedInSucces,
} from "@/store/slices/authSlice";
import {
  generateOPT,
  registerUser,
  validateOtp,
  customer,
} from "@/utils/config";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useMemo, useRef, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/common/loading/Loading";

const Page = () => {
  const auth = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const inputs = useRef([]);
  const router = useRouter();
  const number = auth?.mobileNumber;
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [numberModal, setNumberModal] = useState(false);
  const [details, setDetails] = useState();

  //otp generation
  const otpGeneration = async () => {
    if (!number || number.length < 10 || number.length > 10) {
      return toast.error("Please enter a valid 10-digit number");
    }

    const payload = { MobileNumber: String(number) };

    try {
      const response = await axios.post(generateOPT, payload);
      dispatch(
        setAuthDetails({
          cust_id: response.data.data.customer_id,
          customer_exists: response.data.data.customerExists,
        })
      );

      // if (response.data.data.customerExists === 0) {
      //   dispatch(setIsNewCustomer(true));
      // } else {
      //   dispatch(setIsNewCustomer(false));
      // }
      toast.success(response.data.message);
      setNumberModal(false);
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
          toast.error(data.message);
        }
      }
    }
  };

  const changeNumberOtpGeneration = async () => {
    if (!number || number.length < 10 || number.length > 10) {
      return toast.error("Please enter a valid 10-digit number");
    }

    const payload = { MobileNumber: String(number) };

    try {
      const response = await axios.post(generateOPT, payload);
      dispatch(
        setAuthDetails({
          cust_id: response.data.data.customer_id,
          customer_exists: response.data.data.customerExists,
        })
      );

      // const customerResponse = await axios.post(`${customer.GET_BY_ID}`, {
      //   customer_id: auth?.custId,
      // });
      // const customerData = customerResponse.data;
      // console.log(customerData.CustomerName);

      // if (!details?.CustomerName) {
      //   console.log("!details?.CustomerName");
      //   console.log(details.CustomerName);
      //   dispatch(setIsNewCustomer(true));
      // } else {
      //   console.log("details?.CustomerName");
      //   console.log(details.CustomerName);
      //   dispatch(setIsNewCustomer(false));
      // }
      toast.success(response.data.message);
      setNumberModal(false);
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
          toast.error(data.message);
        }
      }
    }
  };

  const handleUserDetails = async () => {
    const payload = {
      customer_id: auth?.custId,
      CustomerName: formData.name,
      Email: formData.email,
    };

    try {
      const response = await axios.post(registerUser, payload);
      toast.success(response.data.message);
      dispatch(setIsNewCustomer(null));
      fetchCustomerData();
      dispatch(loggedInSucces());
      router.push("/");
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
        }
      }
    }
  };

  const handleForm = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChange = (e, index) => {
    const { value } = e.target;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputs.current[index + 1]?.focus();
    } else if (!value && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    if (auth?.custId) {
      fetchCustomerData();
    }
  }, [auth?.custId]);

  const fetchCustomerData = async () => {
    const payload = { customer_id: auth?.custId };
    try {
      const response = await axios.post(`${customer.GET_BY_ID}`, payload);
      setDetails(response.data.data);
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
          toast.error(data.message);
        }
      }
    }
  };

  // otp verification
  const handleOtpVerification = async () => {
    // setReload(false);
    const stringOtp = otp.join("");

    if (!stringOtp || stringOtp.length !== 6) {
      return toast.error("Please enter a valid OTP");
    }

    const payload = {
      Otp: stringOtp,
      customer_id: auth?.custId,
    };

    try {
      const response = await axios.post(validateOtp, payload);
      dispatch(setToken(response.data.data.token));
      toast.success(response.data.message);
      // setOtpVerified(true);
      // setReload(true);

      // if (auth?.customerExists === 1 && !auth?.isNewCustomer) {
      // dispatch(loggedInSucces());
      // handleOpen(2); // Proceed to the next accordion step automatically
      // }
      await fetchCustomerData();
      if (!details?.CustomerName) {
        dispatch(setIsNewCustomer(true));
      } else {
        dispatch(setIsNewCustomer(false));
        dispatch(loggedInSucces());
        router.push("/");
        setLoading(true);
      }
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
        }
      }
    }
  };

  const resendOtp = async () => {
    setOtp(Array(6).fill(""));
    if (!number) {
      return toast.error("Please enter a valid 10-digit number");
    }

    const payload = { MobileNumber: String(number) };

    try {
      const response = await axios.post(generateOPT, payload);
      dispatch(
        setAuthDetails({
          cust_id: response.data.data.customer_id,
          customer_exists: response.data.data.customerExists,
        })
      );

      toast.success(response.data.message);

      setNumberModal(false);
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
        }
      }
    }
  };

  if (loading) return <Loading />;

  return (
    <div className=" h-screen  ">
      <Toaster />
      <div className=" h-full w-full md:grid md:grid-cols-2  relative flex justify-center items-center">
        <div className=" relative w-full h-full">
          <Image src={"/pic.jpg"} alt="image" layout="fill" objectFit="cover" />
        </div>

        <div className=" md:px-6 md:py-52 w-[90%]  px-10 m-4 py-10 absolute md:static  backdrop-blur-md border border-gray-500 h-890 rounded-md md:rounded-none md:border-none md:h-full">
          {/* initial mobile nuymber section  */}
          {!auth?.isLoggedIn && !auth?.token && !auth?.custId && (
            <div className=" w-full  h-full flex  justify-center flex-col">
              <h1 className="md:text-3xl text-base font-bold md:mb-6 mb-4 text-white md:text-black">
                Welcome to eventing club
              </h1>

              <p className="text-base mb-3 text-white md:text-black">
                Phone number*
              </p>
              <input
                type="text"
                placeholder="+91"
                value={number}
                onChange={(e) => {
                  {
                    dispatch(setMobileNumber(e.target.value));
                  }
                }}
                className="placeholder:text-slate-400 border w-full border-gray-500  rounded-md py-2 pl-2 outline-none focus:outline-none focus:ring focus:border-gray-50"
              />
              <button
                type="submit"
                onClick={otpGeneration}
                className="whitespace-nowrap capitalize inline-flex items-center mt-3 justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 w-full 
          "
              >
                continue
              </button>
            </div>
          )}

          {auth?.custId && !auth?.token && !numberModal && (
            <div>
              <h1 className="md:text-3xl text-base mb-2 text-white md:text-black">
                We had sent you a
              </h1>
              <h2 className="md:text-3xl tex t-base md:text-gray-500 text-gray-700">
                OTP to verify your number
              </h2>
              <div className="mt-4 flex md:gap-2  gap-1">
                {otp.map((_, index) => (
                  <input
                    key={index}
                    value={otp[index]}
                    type="text"
                    className="md:w-12 md:h-12 w-8 h-8 rounded-md border border-gray-400 text-center outline-none focus:outline-gray-300"
                    placeholder="0"
                    ref={(el) => (inputs.current[index] = el)}
                    onChange={(e) => handleChange(e, index)}
                    onInput={(e) => {
                      // Allow only one numeric character
                      const value = e.target.value;
                      if (value.length > 1 || isNaN(value)) {
                        e.target.value = value
                          .slice(0, 1)
                          .replace(/[^0-9]/g, "");
                      }
                    }}
                  />
                ))}
              </div>
              <div className="flex gap-4 mt-6 md:mt-4 md:w-96 mb-2 ">
                <span className="cursor-pointer underline" onClick={resendOtp}>
                  Resend
                </span>
                <span
                  className="cursor-pointer underline"
                  onClick={() => {
                    setOtp(Array(6).fill(""));
                    setNumberModal(true);
                  }}
                >
                  Change Number
                </span>
              </div>
              <button
                type="submit"
                onClick={handleOtpVerification}
                className="whitespace-nowrap capitalize inline-flex items-center mt-3 justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 w-full 
          "
              >
                continue
              </button>
            </div>
          )}

          {/* form for new user */}
          {auth?.custId &&
            auth?.token &&
            (!auth?.customerExists || auth?.isNewCustomer) && (
              <div>
                <p className="text-sm mb-3  text-black">Name*</p>
                <input
                  type="text"
                  value={formData.name}
                  name="name"
                  onChange={handleForm}
                  placeholder="Enter here"
                  className="placeholder:text-slate-400 border w-full border-gray-500 rounded-md py-2 pl-2 outline-none focus:outline-none focus:ring focus:border-gray-50"
                />

                <p className="text-sm mb-3 mt-4 text-black">Email*</p>
                <input
                  type="text"
                  value={formData.email}
                  name="email"
                  onChange={handleForm}
                  placeholder="Enter here"
                  className="placeholder:text-slate-400 border w-full border-gray-500 rounded-md py-2 pl-2 outline-none focus:outline-none focus:ring focus:border-gray-50"
                />

                <button
                  type="submit"
                  onClick={handleUserDetails}
                  className="whitespace-nowrap capitalize inline-flex items-center mt-3 justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 w-full"
                >
                  Continue
                </button>
              </div>
            )}

          {/* change number section */}
          {numberModal && (
            <div className=" w-full  h-full flex  justify-center flex-col">
              <h1 className="md:text-3xl text-base font-bold md:mb-6 mb-4 text-white md:text-black">
                Welcome to eventing club
              </h1>

              <p className="text-base mb-3 text-white md:text-black">
                Phone number*
              </p>
              <input
                type="text"
                placeholder="+91"
                value={number}
                onChange={(e) => {
                  {
                    dispatch(setMobileNumber(e.target.value));
                  }
                }}
                className="placeholder:text-slate-400 border w-full border-gray-500  rounded-md py-2 pl-2 outline-none focus:outline-none focus:ring focus:border-gray-50"
              />
              <button
                type="submit"
                onClick={changeNumberOtpGeneration}
                className="whitespace-nowrap capitalize inline-flex items-center mt-3 justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 w-full 
          "
              >
                continue
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
