import {
  setMobileNumber,
  setAuthDetails,
  setIsNewCustomer,
  setToken,
  logout,
  loggedInSucces,
} from "@/store/slices/authSlice";
import {
  customer,
  generateOPT,
  registerUser,
  validateOtp,
} from "@/utils/config";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const verification = ({ setDetails, handleOpen }) => {
  const auth = useSelector((store) => store.auth);
  console.log(auth);
  const [reload, setReload] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [otpVerified, setOtpVerified] = useState(false);
  const [numberModal, setNumberModal] = useState(false);

  // const [number, setNumber] = useState(() => {
  //   const savedNumber = localStorage.getItem("mobile");
  //   return savedNumber ? JSON.parse(savedNumber) : "";
  // });

  const number = auth?.mobileNumber;

  const inputs = useRef([]);
  const dispatch = useDispatch();
  const [otp, setOtp] = useState(Array(6).fill(""));

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

      if (response.data.data.customerExists === 0) {
        dispatch(setIsNewCustomer(true));
      } else {
        dispatch(setIsNewCustomer(false));
      }
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

  const handleForm = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
      handleOpen(2); // Proceed to next step
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

  const handleOtpVerification = async () => {
    setReload(false);
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
      setOtpVerified(true);
      setReload(true);

      if (auth?.customerExists === 1 && !auth?.isNewCustomer) {
        fetchCustomerData();
        dispatch(loggedInSucces());
        handleOpen(2); // Proceed to the next accordion step automatically
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

  useEffect(() => {
    if (auth?.custId) {
      fetchCustomerData();
    }
  }, [auth?.custId, reload]);

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

  return (
    <div className="w-full">
      <div className="flex flex-col gap-2">
        {/* initial mobile number section */}
        {!auth?.isLoggedIn && !auth?.token && !auth?.custId && (
          <div className="mb-8">
            <div className="w-full">
              <label className="text-xl">Phone number*</label>
              <input
                type="number"
                className="border border-gray-400 rounded-lg block md:w-96 w-full md:text-base mt-2 p-3"
                placeholder="+91"
                value={number}
                onChange={(e) => {
                  {
                    dispatch(setMobileNumber(e.target.value));
                  }
                }}
              />
              <button
                onClick={otpGeneration}
                className={`capitalize border border-gray-400 rounded-lg block md:text-base w-full md:w-96 mt-2 p-2 ${
                  String(number).length
                    ? "bg-blue-900 text-white"
                    : "bg-gray-500 text-white"
                }`}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* otp section */}

        {auth?.custId && !auth?.token && !numberModal && (
          <div className="mt-2 md:mt-0">
            <h1 className="md:text-xl text-base mb-2  md:text-black">
              We have sent you an OTP to verify your number
            </h1>

            <div className="mt-4 flex md:gap-2 gap-2">
              {otp.map((_, index) => (
                <input
                  key={index}
                  value={otp[index]}
                  type="text"
                  className="md:w-10 md:h-10 w-8 h-8 rounded-md border border-gray-400 text-center outline-none focus:outline-gray-300"
                  placeholder="0"
                  ref={(el) => (inputs.current[index] = el)}
                  onChange={(e) => handleChange(e, index)}
                  onInput={(e) => {
                    // Allow only one numeric character
                    const value = e.target.value;
                    if (value.length > 1 || isNaN(value)) {
                      e.target.value = value.slice(0, 1).replace(/[^0-9]/g, "");
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
              className="whitespace-nowrap capitalize inline-flex items-center mt-3 justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 w-full md:w-96"
            >
              Verify OTP
            </button>
          </div>
        )}

        {/* form for new user */}
        {auth?.custId &&
          auth?.token &&
          (!auth?.customerExists || auth?.isNewCustomer || otpVerified) && (
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
          <div className="mb-8">
            <div className="w-full">
              <label className="text-xl">Phone number*</label>
              <input
                type="number"
                className="border border-gray-400 rounded-lg block md:w-96 w-full md:text-base mt-2 p-3"
                placeholder="+91"
                value={number}
                onChange={(e) => {
                  {
                    dispatch(setMobileNumber(e.target.value));
                  }
                }}
              />
              <button
                onClick={otpGeneration}
                className={`capitalize border border-gray-400 rounded-lg block md:text-base w-full md:w-96 mt-2 p-2 ${
                  String(number).length
                    ? "bg-blue-900 text-white"
                    : "bg-gray-500 text-white"
                }`}
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default verification;
