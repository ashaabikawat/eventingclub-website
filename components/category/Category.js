"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Cards from "../card/Cards";
import CardHeaders from "../common/card headers/CardHeaders";
import { initialLength, settings } from "@/utils/constants";
import { categories, getCategories } from "@/utils/config";
import ShimmerCard from "../card/ShimmerCard";
import axios from "axios";
import Link from "next/link";

const Category = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(categories.GET_ALL);
      setCategory(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const cardsData = category.slice(0, 8);
  const dummyCard = Array.from({ length: 2 });

  return (
    <div className=" md:py-6 mt-6 mb-8 sm:px-8 px-1  overflow-hidden md:px-14">
      <CardHeaders
        mobileHeader="Events by categories"
        desktopHeader="Browse events by categories"
        mobileText="See all"
        desktopText="Discover more category"
        url="/categories"
      />
      <Slider {...settings} key={loading ? "loading" : "loaded"}>
        {loading
          ? dummyCard.map((_, index) => (
              <div key={index} className="px-2 mt-6">
                <ShimmerCard />
              </div>
            ))
          : cardsData.map((data) => (
              <div key={data.id} className="px-2 mt-6">
                <Link href={`/categories/${data._id}`}>
                  <Cards data={data} />
                </Link>
              </div>
            ))}
      </Slider>
    </div>
  );
};

export default Category;
