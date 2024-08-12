"use client";
import React, { Component } from "react";
import Slider from "react-slick";
import Cards from "../card/Cards";
import useFetch from "@/hooks/useFetch";
import CardHeaders from "../common/card headers/CardHeaders";
import { initialLength, settings, URL } from "@/utils/constants";
import { getCategories } from "@/utils/config";
import ShimmerCard from "../card/ShimmerCard";

const Category = () => {
  const { data, loading, error } = useFetch(getCategories);
  const cardsData = data.slice(0, 8);

  return (
    <div className="md:py-12 md:px-14 p-6 ">
      <CardHeaders
        mobileHeader="Browse by categories"
        desktopHeader="Browse events by categories"
        mobileText="See all"
        desktopText="Discover more category"
        url="/categories"
      />
      {/* <div className="grid md:grid-cols-5 sm:grid-cols-2 gap-6 w-full mt-8 "> */}
      <Slider {...settings}>
        {loading
          ? initialLength.map((_, index) => (
              <div key={index} className="p-2 mt-8">
                <ShimmerCard />
              </div>
            ))
          : cardsData.map((data) => (
              <div key={data.id} className="p-2 mt-8">
                <Cards data={data} />
              </div>
            ))}
      </Slider>
      {/* </div> */}
    </div>
  );
};

export default Category;
