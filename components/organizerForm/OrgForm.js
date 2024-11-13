import Image from "next/image";
import React from "react";

const OrgForm = () => {
  return (
    <div className="h-full w-full py-10  md:px-20 px-6  ">
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
        <div className=" h-full w-full md:flex items-center md:px-6  ">
          <form>
            <div className="space-y-6 w-full">
              <div className="border-b border-gray-900/10 pb-6">
                <div className=" grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                  <div className="col-span-8">
                    <label
                      htmlFor="full-name"
                      className="block text-base font-medium text-gray-900"
                    >
                      Full name
                    </label>
                    <div className="mt-2">
                      <input
                        id="full-name"
                        name="full-name"
                        placeholder="Enter your full name"
                        type="text"
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
                      Email
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        placeholder="Enter your email address"
                        type="email"
                        autoComplete="email"
                        className="block py-2 px-2 w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3 col-span-8">
                    <label
                      htmlFor="number"
                      className="block text-base font-medium text-gray-900"
                    >
                      Phone no.
                    </label>
                    <div className="mt-2">
                      <input
                        id="number"
                        placeholder="Enter your no."
                        name="number"
                        type="number"
                        className="block px-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div className="col-span-8 ">
                    <label
                      htmlFor="org-name"
                      className="block text-base font-medium text-gray-900"
                    >
                      Organization name
                    </label>
                    <div className="mt-2">
                      <input
                        id="org-name"
                        name="org-name"
                        placeholder="Enter your organization name"
                        type="text"
                        // autoComplete="given-name"
                        className="block px-2 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4 col-span-8">
                    <label
                      htmlFor="full-name"
                      className="block text-base font-medium text-gray-900"
                    >
                      Position/Role
                    </label>
                    <div className="mt-2">
                      <input
                        id="position"
                        name="position"
                        placeholder="Enter your role"
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
