"use client";

import { getCustomerById, updateCustomer } from "@/utils/config";
import React, { useEffect, useMemo, useState } from "react";

const EditProfile = ({ id, data, fetchData }) => {
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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    state: "",
    city: "",
    pincode: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        ...formData,
        name: data.CustomerName || "",
        email: data.Email || "",
        state: data.State || "",
        city: data.City || "",
        pincode: data.Pincode || "",
      });
    }
  }, [data]);

  const dataBody = useMemo(() => {
    return {
      customer_id: id,
      CustomerName: formData.name,
      Email: formData.email,
      // Birthdate: formData.birthdate,
      // Address: formData.address,
      State: formData.state,
      City: formData.city,
      Pincode: String(formData.pincode),
    };
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Form Data:", formData);
    // console.log("Data Body:", dataBody);
    const data = await apiCall(updateCustomer, "POST", dataBody);
    await fetchData();
    alert(data.message);
  };

  return (
    <div className="text-black ">
      <div className="flex items-start justify-between flex-col md:gap-6 gap-10">
        <div className="flex justify-between items-start flex-col w-full">
          <h1 className="md:text-xl capitalize text-lg mb-6">
            Account details
          </h1>
          <div className="flex flex-col gap-6  w-full">
            <div className="flex md:flex-row flex-col md:items-center gap-2 md:gap-10">
              <label className="capitalize w-36 ">Email address :</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={(e) => handleChange(e)}
                placeholder="Enter here"
                className="placeholder:text-slate-400 border  md:w-96 w-full py-2 px-4 border-gray-500 rounded-md  outline-none focus:outline-none focus:ring focus:border-gray-50"
              />
            </div>
            <div className="flex md:flex-row flex-col md:items-center gap-2 md:gap-10">
              <label className="capitalize w-36 ">mobile number :</label>
              <input
                type="text"
                name="number"
                value={data ? data.MobileNumber : ""}
                readOnly
                placeholder="Enter here"
                className="placeholder:text-slate-400 border border-gray-500  md:w-96 w-full py-2 px-4  cursor-not-allowed rounded-md  outline-none  bg-gray-200"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-start flex-col w-full">
          <h1 className="md:text-xl capitalize text-lg mb-6">
            personal details
          </h1>
          <div className="flex flex-col gap-6  w-full">
            <div className="flex md:flex-row flex-col md:items-center gap-2 md:gap-10">
              <label className="capitalize w-36 ">full name :</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => handleChange(e)}
                placeholder="Enter here"
                className="placeholder:text-slate-400 border  md:w-96 w-full py-2 px-4 border-gray-500 rounded-md  outline-none focus:outline-none focus:ring focus:border-gray-50"
              />
            </div>
            {/* <div className="flex md:flex-row flex-col md:items-center gap-2 md:gap-10">
              <label className="capitalize w-36 ">Birth date :</label>
              <input
                type="date"
                name="birthdate"
                value={formData.birthdate}
                onChange={(e) => handleChange(e)}
                placeholder="Enter here"
                className="placeholder:text-slate-400 border  md:w-96 w-full py-2 px-4 border-gray-500 rounded-md  outline-none focus:outline-none focus:ring focus:border-gray-50"
              />
            </div> */}
          </div>
        </div>
        <div className="flex justify-between items-start flex-col w-full">
          <h1 className="md:text-xl capitalize text-lg mb-6">Address</h1>
          <div className="flex flex-col gap-6  w-full">
            <div className="flex md:flex-row flex-col md:items-center gap-2 md:gap-10">
              <label className="capitalize w-36 ">pincode :</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={(e) => handleChange(e)}
                placeholder="Enter here"
                className="placeholder:text-slate-400 border  md:w-96 w-full py-2 px-4 border-gray-500 rounded-md  outline-none focus:outline-none focus:ring focus:border-gray-50"
              />
            </div>
            <div className="flex md:flex-row flex-col md:items-center gap-2 md:gap-10">
              <label className="capitalize w-36 ">city :</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={(e) => handleChange(e)}
                placeholder="Enter here"
                className="placeholder:text-slate-400 border  md:w-96 w-full py-2 px-4 border-gray-500 rounded-md  outline-none focus:outline-none focus:ring focus:border-gray-50"
              />
            </div>
            <div className="flex md:flex-row flex-col md:items-center gap-2 md:gap-10">
              <label className="capitalize w-36 ">state :</label>
              <input
                type="text"
                name="state"
                placeholder="Enter here"
                onChange={(e) => handleChange(e)}
                value={formData.state}
                className="placeholder:text-slate-400 border  md:w-96 w-full py-2 px-4 border-gray-500 rounded-md  outline-none focus:outline-none focus:ring focus:border-gray-50"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="  flex justify-center">
        <button
          type="submit"
          onClick={handleSubmit}
          className="whitespace-nowrap my-6   inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Save changes
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
