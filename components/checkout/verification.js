import {
  generateOPT,
  getCustomerById,
  registerUser,
  validateOtp,
} from "@/utils/config";
import {
  loginSuccess,
  setAuthDetails,
  setToken,
} from "@/store/slices/authSlice";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Accordion } from "@material-tailwind/react";

const Verification = ({ setIsLoggedIn, setDetails, handleOpen }) => {
  const dispatch = useDispatch();
  const [number, setNumber] = useState("");
  const inputs = useRef([]);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [otpVerified, setOtpVerified] = useState(false);
  const [reload, setReload] = useState(true);

  const customerId = useSelector((state) => state.auth.cust_id);

  const token = useSelector((state) => state.auth.token);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const getToken = localStorage.getItem("authToken");
  const cust_id = JSON.parse(getToken)?.cust_id;
  const userExists = useSelector((state) => state.auth.customer_exists);
  // console.log(reload);

  useEffect(() => {
    fetchCustomerData();
  }, [cust_id, reload]);

  const fetchCustomerData = async () => {
    if (cust_id) {
      const payload = { customer_id: cust_id };
      try {
        const response = await axios.post(getCustomerById, payload);
        console.log(response.data.data);
        setDetails(response.data.data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setReload(false); // Reset reload to false after fetching
      }
    }
  };

  const handleChange = (e, index) => {
    const { value } = e.target;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < otp.length - 1 && value !== "") {
      if (inputs.current[index + 1]) {
        inputs.current[index + 1].focus();
      }
    } else if (value === "" && index > 0) {
      if (inputs.current[index - 1]) {
        inputs.current[index - 1].focus();
      }
    }
  };

  const otpGeneration = async () => {
    if (!number || number.toString().length !== 10) {
      return toast.error("Please enter a valid 10-digit number");
    }

    const payload = { MobileNumber: number };

    try {
      const response = await axios.post(generateOPT, payload);
      dispatch(
        setAuthDetails({
          cust_id: response.data.data.customer_id,
          customer_exists: response.data.data.customerExists,
        })
      );
      toast.success(response.data.message);

      console.log(response.data.data);
      setOtpSent(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleOtpVerification = async () => {
    if (!otp || otp.length !== 6) {
      return toast.error("Please enter a valid OTP");
    }

    const stringOtp = otp.join("");

    const payload = {
      Otp: stringOtp,
      customer_id: customerId,
    };

    try {
      const response = await axios.post(validateOtp, payload);
      dispatch(setToken(response.data.data.token));
      toast.success(response.data.message);
      dispatch(loginSuccess());
      setOtpVerified(true);
      setOtpSent(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleForm = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUserDetails = async () => {
    const payload = {
      customer_id: customerId,
      CustomerName: formData.name,
      Email: formData.email,
    };
    console.log(payload);

    try {
      const response = await axios.post(registerUser, payload);
      toast.success(response.data.message);
      setOtpVerified(false);
      setReload(true);
      setIsLoggedIn(true);
      dispatch(loginSuccess());
      handleOpen(2);
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex flex-col gap-2">
        {!otpSent && !getToken && (
          <div>
            <div className="w-full    ">
              <label className="text-xl">Phone number*</label>
              <input
                type="number"
                className="border border-gray-400 rounded-lg block w-1/3 md:text-base   mt-2 p-3"
                placeholder="+91"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
              <button
                onClick={otpGeneration}
                className={`capitalize border border-gray-400 rounded-lg block md:text-base w-1/3 mt-2 p-2 ${
                  number.length > 1
                    ? "bg-blue-900 text-white"
                    : "bg-gray-500 text-white"
                }`}
              >
                Continue
              </button>
            </div>
          </div>
        )}
        {otpSent && (
          <div className="">
            <h1 className="md:text-xl text-base mb-2 text-white md:text-black">
              We had sent you a OTP to verify your number
            </h1>

            <div className="mt-4 flex md:gap-2 gap-1">
              {otp.map((_, index) => (
                <input
                  key={index}
                  value={otp[index]}
                  type="text"
                  className="md:w-10 md:h-10 w-8 h-8 rounded-md border border-gray-400 text-center outline-none focus:outline-gray-300"
                  placeholder="0"
                  ref={(el) => (inputs.current[index] = el)}
                  onChange={(e) => handleChange(e, index)}
                />
              ))}
            </div>
            <button
              type="submit"
              onClick={handleOtpVerification}
              className="whitespace-nowrap capitalize inline-flex items-center mt-3 justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 md:w-96"
            >
              Continue
            </button>
          </div>
        )}

        {!userExists && otpVerified && (
          <div>
            <h1 className="md:text-3xl text-base font-bold md:mb-6 mb-4 text-white md:text-black">
              Lets get started
            </h1>

            <p className="text-sm mb-3 text-white md:text-black">Name*</p>
            <input
              type="text"
              value={formData.name}
              name="name"
              onChange={handleForm}
              placeholder="Enter here"
              className="placeholder:text-slate-400 border w-full border-gray-500  rounded-md py-2 pl-2 outline-none focus:outline-none focus:ring focus:border-gray-50"
            />
            <p className="text-sm mb-3 mt-4 text-white md:text-black">Email*</p>
            <input
              type="text"
              value={formData.email}
              name="email"
              onChange={handleForm}
              placeholder="Enter here"
              className="placeholder:text-slate-400 border w-full border-gray-500  rounded-md py-2 pl-2 outline-none focus:outline-none focus:ring focus:border-gray-50"
            />
            <button
              type="submit"
              onClick={handleUserDetails}
              className="whitespace-nowrap capitalize inline-flex items-center mt-3 justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 w-full 
"
            >
              continue
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Verification;
