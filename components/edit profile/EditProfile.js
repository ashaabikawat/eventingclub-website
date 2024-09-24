"use client";
import { customer } from "@/utils/config";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const EditProfile = ({ id, data }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    state: "",
    city: "",
    pincode: "",
  });

  // Load initial data into the form fields (only the ones available)
  useEffect(() => {
    if (data) {
      setFormData({
        name: data.CustomerName || "",
        email: data.Email || "",
        state: data.State || "",
        city: data.City || "",
        pincode: data.Pincode || "",
      });
    }
  }, [data]);

  // Handle input change for dynamic form update
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create payload with only non-empty fields
    const payload = {
      customer_id: id,
    };

    if (formData.name && formData.name.length > 2) {
      payload.CustomerName = formData.name;
    } else {
      toast.error("Name must be at least 3 characters long");
      return;
    }

    if (formData.email) payload.Email = formData.email;
    if (formData.state) payload.State = formData.state;
    if (formData.city) payload.City = formData.city;
    if (formData.pincode) payload.Pincode = formData.pincode;

    console.log("Form Data:", formData);
    console.log("Payload to be sent:", payload);

    // Call the update API
    try {
      const response = await axios.post(`${customer.UPDATE_CUSTOMER}`, payload);
      toast.success(response.data.message);
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
    <div className="text-black md:pb-6 p-4">
      <Toaster />
      <div className="flex items-start justify-between flex-col md:gap-6 gap-10">
        <div className="flex justify-between items-start flex-col w-full">
          <h1 className="md:text-xl capitalize text-lg mb-6">
            Account details
          </h1>
          <div className="flex flex-col gap-6 w-full">
            <div className="flex md:flex-row flex-col md:items-center gap-2 md:gap-10">
              <label className="capitalize w-36">Email address :</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter here"
                className="placeholder:text-slate-400 border md:w-96 w-full py-2 px-4 border-gray-500 rounded-md outline-none focus:outline-none focus:ring focus:border-gray-50"
              />
            </div>
            <div className="flex md:flex-row flex-col md:items-center gap-2 md:gap-10">
              <label className="capitalize w-36">Mobile number :</label>
              <input
                type="text"
                name="number"
                value={data ? data.MobileNumber : ""}
                readOnly
                placeholder="Enter here"
                className="placeholder:text-slate-400 border border-gray-500 md:w-96 w-full py-2 px-4 cursor-not-allowed rounded-md outline-none bg-gray-200"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-start flex-col w-full">
          <h1 className="md:text-xl capitalize text-lg mb-6">
            Personal details
          </h1>
          <div className="flex flex-col gap-6 w-full">
            <div className="flex md:flex-row flex-col md:items-center gap-2 md:gap-10">
              <label className="capitalize w-36">Full name :</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter here"
                className="placeholder:text-slate-400 border md:w-96 w-full py-2 px-4 border-gray-500 rounded-md outline-none focus:outline-none focus:ring focus:border-gray-50"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-start flex-col w-full">
          <h1 className="md:text-xl capitalize text-lg mb-6">Address</h1>
          <div className="flex flex-col gap-6 w-full">
            <div className="flex md:flex-row flex-col md:items-center gap-2 md:gap-10">
              <label className="capitalize w-36">Pincode :</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Enter here"
                className="placeholder:text-slate-400 border md:w-96 w-full py-2 px-4 border-gray-500 rounded-md outline-none focus:outline-none focus:ring focus:border-gray-50"
              />
            </div>
            <div className="flex md:flex-row flex-col md:items-center gap-2 md:gap-10">
              <label className="capitalize w-36">City :</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter here"
                className="placeholder:text-slate-400 border md:w-96 w-full py-2 px-4 border-gray-500 rounded-md outline-none focus:outline-none focus:ring focus:border-gray-50"
              />
            </div>
            <div className="flex md:flex-row flex-col md:items-center gap-2 md:gap-10">
              <label className="capitalize w-36">State :</label>
              <input
                type="text"
                name="state"
                placeholder="Enter here"
                onChange={handleChange}
                value={formData.state}
                className="placeholder:text-slate-400 border md:w-96 w-full py-2 px-4 border-gray-500 rounded-md outline-none focus:outline-none focus:ring focus:border-gray-50"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          onClick={handleSubmit}
          className="whitespace-nowrap my-6 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Save changes
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
