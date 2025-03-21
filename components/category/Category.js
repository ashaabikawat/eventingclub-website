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

  const cardsData = category
    ?.filter((items) => items?.Images[0]?.image_path)
    ?.slice(0, 8);

  if (loading) return;

  return (
    <div className="md:py-6 mt-6  px-4 md:px-6 overflow-hidden  ">
      {/* headers */}
      <CardHeaders
        mobileHeader="Events by categories"
        desktopHeader="Browse events by categories"
        mobileText="See all"
        desktopText="Discover more category"
        url="/categories"
      />

      {/* cards */}
      <div className="px-2 ">
        <Swiper
          spaceBetween={20}
          slidesPerView={5}
          breakpoints={{
            320: {
              slidesPerView: 4.6,
              spaceBetween: 10,
            },
            425: {
              slidesPerView: 6,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 8,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 10,
              spaceBetween: 10,
            },
          }}
          className="md:mt-10 mt-6 "
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
