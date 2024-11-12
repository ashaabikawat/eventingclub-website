"use client";
import React from "react";
import Testimonials from "../../components/testimonials/Testimonials";
import Faq from "../../components/faq/Faq";
import Benefits from "@/components/benefits/Benefits";
import Cta from "@/components/cta-btn/Cta";
import OrgForm from "@/components/organizerForm/OrgForm";
import HeroForListWithUs from "@/components/hero/HeroForListWithUs";

const Page = () => {
  return (
    <div className="md:py-10 py-4">
      <HeroForListWithUs />
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
