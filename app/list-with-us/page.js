"use client";
import React from "react";
import Testimonials from "../../components/testimonials/Testimonials";
import Faq from "../../components/faq/Faq";
import Benefits from "@/components/benefits/Benefits";
import Cta from "@/components/cta-btn/Cta";

const Page = () => {
  return (
    <div className="py-10">
      <div className=" md:px-20 px-6">
        <Benefits />
      </div>
      <Testimonials />
      <Faq />
      <div className="py-6">
        <Cta />
      </div>
    </div>
  );
};

export default Page;
