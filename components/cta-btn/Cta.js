import React from "react";

const Cta = () => {
  return (
    <>
      <div className=" flex items-center justify-center font-Atkinson">
        <div
          className=" py-10 px-6 flex md:flex-row gap-4 md:gap-0 flex-col justify-between  items-center w-5/5"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px",
          }}
        >
          <p className="font-bold md:text-xl  md:w-[80%] w-full">
            Join Eventing Club today and experience the difference in event
            management and ticketing.
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-md transition hover:from-blue-700 hover:to-indigo-700">
            <a href="#form">Join now</a>
          </button>
        </div>
      </div>
    </>
  );
};

export default Cta;
