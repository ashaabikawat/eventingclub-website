"use client";
import React from "react";
import Slider from "react-slick";
import Cards from "../card/Cards";
import useFetch from "@/hooks/useFetch";
import CardHeaders from "../common/card headers/CardHeaders";
import { initialLength, settings } from "@/utils/constants";
import { getCategories } from "@/utils/config";
import ShimmerCard from "../card/ShimmerCard";

const Category = () => {
  const { data, loading, error } = useFetch(getCategories);
  const cardsData = data.slice(0, 8);

  return (
    <div className=" md:py-6 mt-6 mb-8 sm:px-8 px-6  overflow-hidden md:px-14">
      <CardHeaders
        mobileHeader="Browse by categories"
        desktopHeader="Browse events by categories"
        mobileText="See all"
        desktopText="Discover more category"
        url="/categories"
      />
      <Slider {...settings}>
        {loading
          ? initialLength.map((_, index) => (
              <div key={index} className="mt-8">
                <ShimmerCard />
              </div>
            ))
          : cardsData.map((data) => (
              <div key={data.id} className="px-2 mt-6">
                <Cards data={data} />
              </div>
            ))}
      </Slider>
    </div>
  );
};

export default Category;
