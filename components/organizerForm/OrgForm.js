"use client";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { leadGeneration } from "@/utils/config";
import axios from "axios";

const OrgForm = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    orgName: "",
    city: "",
  });

  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    toast.dismiss();
    e.preventDefault();
    if (
      form.fullName === undefined ||
      form.fullName === null ||
      form.fullName === ""
    ) {
      toast.error("Full name is required");
      return;
    }

    if (form.fullName.length <= 2) {
      toast.error("Full name must be at least 3 characters long");
      return;
    }

    if (form.phone.length < 10 || form.phone.length > 10) {
      toast.error("Please enter a valid phone number");
      return;
    }
    if (form.orgName.length <= 2) {
      toast.error("club name should be at least 3 characters long");
      return;
    }
    if (form.position.length <= 2) {
      toast.error("position should be at least 3 characters long");
      return;
    }
    if (form.city.length <= 2) {
      toast.error("city should be at least 3 characters long");
      return;
    }

    const payload = {
      FullName: form.fullName,
      Email: form.email,
      Position: form.position,
      City: form.city,
      CompanyName: form.orgName,
      PhoneNumber: form.phone,
    };
    console.log(payload);

    try {
      const response = axios.post(`${leadGeneration.ADD_LEADS}`, payload);
      toast.success((await response).data.message);
      setForm({
        fullName: "",
        email: "",
        phone: "",
        position: "",
        orgName: "",
        city: "",
      });
    } catch (error) {
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
        console.log(error.response);
        toast.error(data.message);
      }
    }
  };

  const handleCancel = () => {
    setForm({
      fullName: "",
      email: "",
      phone: "",
      position: "",
      orgName: "",
      city: "",
    });
  };

  return (
    <div className="h-full w-full py-10  md:px-20 px-6 " id="form">
      {/* <Toaster /> */}
      <div className="h-full w-full grid md:grid-cols-2 md:gap-x-4 gap-y-6">
        {/* illustration */}
        <div className=" h-full w-full">
          <div className="md:flex items-center justify-center h-full w-full">
            <Image
              src={"/login.png"}
              height={800}
              width={600}
              objectFit="cover"
              alt="login"
            />
          </div>
        </div>
        {/* form */}
        <div className=" h-full w-full md:flex  font-nunitositems-center md:px-6  ">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6 w-full">
              <div className="border-b border-gray-900/10 pb-6">
                <div className=" grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                  <div className="col-span-8">
                    <label
                      htmlFor="fullName"
                      className="block text-base font-medium text-gray-900"
                    >
                      Full name*
                    </label>
                    <div className="mt-2">
                      <input
                        id="fullName"
                        name="fullName"
                        value={form.fullName}
                        placeholder="Enter your full name"
                        type="text"
                        required
                        onChange={handleForm}
                        autoComplete="given-name"
                        className="block w-full  rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4 col-span-8">
                    <label
                      htmlFor="email"
                      className="block text-base font-medium text-gray-900"
                    >
                      Email*
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        required
                        name="email"
                        value={form.email}
                        onChange={handleForm}
                        placeholder="Enter your email address"
                        type="email"
                        autoComplete="email"
                        className="block py-2 px-2 w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3 col-span-8">
                    <label
                      htmlFor="phone"
                      className="block text-base font-medium text-gray-900"
                    >
                      Phone no.*
                    </label>
                    <div className="mt-2">
                      <input
                        id="phone"
                        onChange={handleForm}
                        value={form.phone}
                        placeholder="Enter your no."
                        name="phone"
                        type="number"
                        required
                        className="block px-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div className="col-span-8 ">
                    <label
                      htmlFor="orgName"
                      className="block text-base font-medium text-gray-900"
                    >
                      Organization name /club name*
                    </label>
                    <div className="mt-2">
                      <input
                        id="orgName"
                        onChange={handleForm}
                        value={form.orgName}
                        name="orgName"
                        placeholder="Enter your organization name"
                        type="text"
                        required
                        // autoComplete="given-name"
                        className="block px-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4 col-span-8">
                    <label
                      htmlFor="position"
                      className="block text-base font-medium text-gray-900"
                    >
                      Position/Role*
                    </label>
                    <div className="mt-2">
                      <input
                        id="position"
                        name="position"
                        placeholder="Enter your role"
                        type="text"
                        required
                        value={form.position}
                        onChange={handleForm}
                        // autoComplete="given-name"
                        className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-4 col-span-8">
                    <label
                      htmlFor="city"
                      className="block text-base font-medium text-gray-900"
                    >
                      City*
                    </label>
                    <div className="mt-2">
                      <input
                        id="city"
                        value={form.city}
                        required
                        name="city"
                        onChange={handleForm}
                        placeholder="Enter your city"
                        type="text"
                        // autoComplete="given-name"
                        className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className=" mt-4 flex items-center justify-end gap-x-6">
              <button
                type="button"
                onClick={handleCancel}
                className="text-sm/6 font-semibold text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrgForm;
