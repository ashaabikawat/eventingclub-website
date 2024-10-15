"use client";
import { IconButton } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const socialIcons = [
    {
      id: 1,
      name: "facebook",
      icon: "fa-facebook-f",
    },
    {
      id: 2,
      name: "twitter",
      icon: "fa-twitter",
    },
    {
      id: 3,
      name: "instagram",
      icon: "fa-instagram",
    },
    {
      id: 4,
      name: "pinterest",
      icon: "fa-pinterest",
    },
  ];

  return (
    <div
      className="px-10  md:py-16 py-10   text-white"
      style={{ backgroundColor: "#2f3e93" }}
    >
      <div className="flex justify-between items-center  lg:flex-row flex-col gap-6 ">
        <div>
          <span className="sr-only">Logo</span>
          <Link href="/">
            <div className="cursor-pointer relative md:h-20 md:w-52 h-14 w-28">
              <Image
                src="/Eventing club logo transparent.png"
                alt="logo"
                layout="fill"
                className="absolute"
                objectFit="contain"
              ></Image>
            </div>
          </Link>
        </div>
        <div>
          <ul className="flex justify-center items-center md:text-xl text-base md:gap-10 gap-4  flex-wrap">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/venue">Venue</Link>
            </li>
            <li>
              <Link href="/artists">Artist</Link>
            </li>
            <li>
              <Link href="/blogs">Blogs</Link>
            </li>
            <li>
              <Link href="/contact">Contact us</Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center justify-center gap-4 ">
          {socialIcons.map((icon) => (
            <IconButton
              key={icon.id}
              size="lg"
              className="bg-white border-transparent rounded-full p-6"
              variant="outlined"
            >
              <i class={`fab ${icon.icon} md:fa-lg fa-xl text-blue-900`}></i>
            </IconButton>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
