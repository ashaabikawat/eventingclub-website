"use client";
import React from "react";
import Testimonials from "../../components/testimonials/Testimonials";
import Faq from "../../components/faq/Faq";

const Page = () => {
  return (
    <div className="md:py-10 md:px-6">
      <Testimonials />
      <Faq />
    </div>
  );
};

export default Page;
