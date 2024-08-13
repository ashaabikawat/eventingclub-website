"use client";

import { setCustExists, setCustId, setToken } from "@/store/slices/authSlice";
import { generateOPT, registerUser, validateOtp } from "@/utils/config";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [otpSent, setOtpSent] = useState(false);
  const [number, setNumber] = useState();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const customerId = useSelector((state) => state.auth.cust_id);
  const userExists = useSelector((state) => state.auth.customer_exists);
  const token = useSelector((state) => state.auth.token);

  const apiCall = async (url, method, body) => {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : null,
    });
    const data = await response.json();
    console.log(data);
    return data;
  };

  const navigate = () => {
    router.push("/");
  };

  const stringOtp = otp.join("");

  const requestBody = useMemo(() => {
    return {
      MobileNumber: number,
    };
  }, [number]);

  const body = useMemo(() => {
    return {
      customer_id: customerId,
      Otp: stringOtp,
    };
  }, [stringOtp, customerId]);

  const userDetails = useMemo(() => {
    return {
      customer_id: customerId,
      CustomerName: formData.name,
      Email: formData.email,
    };
  }, [customerId, formData.name, formData.email]);

  const handleForm = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChange = (e, index) => {
    const { value } = e.target;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleOtpverification = async () => {
    const data = await apiCall(validateOtp, "POST", body);
    const token = await data.data.token;
    dispatch(setToken(token));
    localStorage.setItem("authToken", JSON.stringify({ token, customerId }));
    setOtpSent(false);
  };

  const handleSubmit = async () => {
    setOtpSent(true);
    const data = await apiCall(generateOPT, "POST", requestBody);
    const customerId = await data.data.customer_id;
    const customerExists = await data.data.customerExists;
    dispatch(setCustId(customerId));
    dispatch(setCustExists(customerExists));
  };

  const handleUserDetails = async () => {
    const data = await apiCall(registerUser, "POST", userDetails);
    // console.log(userDetails);
    console.log(data);
    router.push("/");
  };

  return (
    <div className=" h-screen  ">
      <div className=" h-full w-full md:grid md:grid-cols-2  relative flex justify-center items-center">
        <div className=" relative w-full h-full">
          <Image src={"/pic.jpg"} alt="image" layout="fill" objectFit="cover" />
        </div>
        <div className=" md:px-6 md:py-52 px-10 m-4 py-10 absolute md:static backdrop-blur-md border border-gray-500 h-890 rounded-md md:rounded-none md:border-none top-20 md:h-full">
          {!otpSent && !token && (
            <div>
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
                onChange={(e) => setNumber(e.target.value)}
                className="placeholder:text-slate-400 border w-full border-gray-500  rounded-md py-2 pl-2 outline-none focus:outline-none focus:ring focus:border-gray-50"
              />
            </div>
          )}
          {otpSent && (
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
                    onChange={(e) => handleChange(e, index)}
                  />
                ))}
              </div>
            </div>
          )}
          {token ? (
            userExists ? (
              navigate()
            ) : (
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
                <p className="text-sm mb-3 text-white md:text-black">Email*</p>
                <input
                  type="text"
                  value={formData.email}
                  name="email"
                  onChange={handleForm}
                  placeholder="Enter here"
                  className="placeholder:text-slate-400 border w-full border-gray-500  rounded-md py-2 pl-2 outline-none focus:outline-none focus:ring focus:border-gray-50"
                />
              </div>
            )
          ) : null}
          {!token && (
            <button
              type="submit"
              onClick={otpSent ? handleOtpverification : handleSubmit}
              className="whitespace-nowrap capitalize inline-flex items-center mt-3 justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 w-full 
            "
            >
              continue
            </button>
          )}
          {token && (
            <button
              type="submit"
              onClick={handleUserDetails}
              className="whitespace-nowrap capitalize inline-flex items-center mt-3 justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 w-full 
          "
            >
              continue
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
