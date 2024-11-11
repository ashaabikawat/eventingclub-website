"use client";
import React from "react";
import Testimonials from "../../components/testimonials/Testimonials";
import Faq from "../../components/faq/Faq";
import Benefits from "@/components/benefits/Benefits";
import Cta from "@/components/cta-btn/Cta";
import OrgForm from "@/components/organizerForm/OrgForm";

const Page = () => {
  return (
    <div className="py-10">
      <div className=" md:px-20 px-6">
        <Benefits />
      </div>
      <Testimonials />
      <Faq />
      <div className="md:py-14 py-10">
        <Cta />
      </div>
      <OrgForm />
    </div>
  );
};

export default Page;
