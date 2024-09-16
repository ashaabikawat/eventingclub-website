import { generateOPT, getCustomerById, validateOtp } from "@/utils/config";
import { setAuthDetails, setToken } from "@/store/slices/authSlice";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const Verification = ({ bookingData }) => {
  const dispatch = useDispatch();
  const [token, setToken] = useState(null);
  const [data, setData] = useState();
  const [number, setNumber] = useState("");
  const inputs = useRef([]);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const customerId = useSelector((state) => state.auth.cust_id);
  console.log(customerId);

  useEffect(() => {
    const handleStorage = () => {
      const token = JSON.parse(localStorage.getItem("authToken"));
      // console.log(token);
      setToken(token);
    };

    handleStorage();

    window.addEventListener("storage", handleStorage);

    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  console.log(token);

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

  const fetchData = async () => {
    if (token && token.cust_id) {
      try {
        const payload = { customer_id: token.cust_id };
        console.log(payload);
        const response = await axios.post(`${getCustomerById}`, payload);
        console.log(response.data);
        setData(response.data.data);
        // toast.success(response.data.message)
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);
  // console.log(customerId);
  // console.log("bookingData", bookingData);

  //otp generation
  const otpGeneration = async () => {
    // console.log(number);
    if (!number || number.toString().length !== 10 || number === null) {
      return toast.error("Please enter a valid 10-digit number");
    }

    const payload = {
      MobileNumber: number,
    };

    console.log(payload);
    try {
      const response = await axios.post(generateOPT, payload);
      console.log(response.data.data);
      dispatch(
        setAuthDetails({
          cust_id: response.data.data.customer_id,
          customer_exists: response.data.data.customerExists,
        })
      );
      toast.success(response.data.message);
      setOtpSent(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // otp verification
  const handleOtpverification = async () => {
    if (!otp || otp.length !== 6) {
      return toast.error("Please enter a valid OTP");
    }

    const stringOtp = otp.join("");

    const payload = {
      Otp: stringOtp,
      customer_id: customerId,
    };

    console.log(payload);

    try {
      const response = await axios.post(validateOtp, payload);
      dispatch(setToken(response.data.data.token));
      // dispatch(setToken({ token: response.data.data.token }));
      console.log(response.data);
      toast.success(response.data.message);
      setOtpSent(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="md:px-12 md:mt-10">
      <h1 className="capitalize md:text-3xl md:mb-8">
        Confirm your ticket details and pay
      </h1>
      <div>
        <div>
          <div>
            <div className="border border-gray-400  rounded-lg md:py-6 px-4">
              {token === null ? (
                otpSent ? (
                  <div>
                    <h1 className="md:text-3xl text-base mb-2 text-white md:text-black">
                      We had sent you a
                    </h1>
                    <h2 className="md:text-3xl text-base md:text-gray-500 text-gray-700">
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
                        />
                      ))}
                    </div>
                    <button
                      type="submit"
                      onClick={handleOtpverification}
                      className="whitespace-nowrap capitalize inline-flex items-center mt-3 justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 w-full"
                    >
                      Continue
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex flex-col gap-2">
                      <p className="">Step 1</p>
                      <p className="font-bold text-xl">Log in</p>
                    </div>
                    <div className="mt-6">
                      <label className="text-lg">Phone number*</label>
                      <input
                        type="number"
                        className="border border-gray-400 rounded-lg block w-96 mt-2 p-2"
                        placeholder="+91"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                      />
                      <button
                        onClick={otpGeneration}
                        className={`capitalize border border-gray-400 rounded-lg block w-96 mt-2 p-2 ${
                          number.length > 1
                            ? "bg-blue-900 text-white"
                            : "bg-gray-300"
                        }`}
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )
              ) : (
                <div className="flex flex-col gap-2">
                  <p className="">Step 1</p>
                  <p className="font-bold text-xl">Logged in as:</p>
                  <p className="text-base">{data?.Email}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;
