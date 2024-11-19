"use client";
import React, { useEffect, useState } from "react";
import Cards from "../card/Cards";
import CardHeaders from "../common/card headers/CardHeaders";
import { categories } from "@/utils/config";
import axios from "axios";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

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
      if (error.response) {
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
          setLoading(false);
        }
      }
    }
  };

  const cardsData = category.slice(0, 8);
  if (loading) return;

  return (
    <div className="md:py-6 mt-6 mb-8 sm:px-4 px-1 overflow-hidden md:px-4">
      {/* headers */}
      <CardHeaders
        mobileHeader="Events by categories"
        desktopHeader="Browse events by categories"
        mobileText="See all"
        desktopText="Discover more category"
        url="/categories"
      />

      {/* cards */}
      <div className="px-2">
        <Swiper
          spaceBetween={20}
          slidesPerView={5}
          breakpoints={{
            320: {
              slidesPerView: 3,
              spaceBetween: 16,
            },
            425: {
              slidesPerView: 2.2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3.2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 5.2,
              spaceBetween: 20,
            },
          }}
          className="md:mt-6 mt-4 "
        >
          {cardsData?.map((data) => (
            <SwiperSlide key={data.id} className="w-full">
              <Link href={`/categories/${data._id}`}>
                <Cards data={data} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Category;
