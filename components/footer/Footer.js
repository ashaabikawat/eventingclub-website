"use client";
import { IconButton } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const socialIcons = [
    {
      id: 1,
      name: "instagram",
      icon: "fa-instagram",
      url: "https://www.instagram.com/eventingclub/",
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
            <div className="cursor-pointer relative md:h-20 md:w-44 h-14 w-28">
              <Image
                src="/Frame 8107.png"
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
          </ul>
        </div>
        <div className="flex items-center justify-center gap-4 ">
          {socialIcons.map((icon) => (
            <Link href={icon.url}>
              <IconButton
                key={icon.id}
                size="lg"
                className="bg-white border-transparent rounded-full p-6"
                variant="outlined"
              >
                <i class={`fab ${icon.icon} md:fa-lg fa-xl text-blue-900`}></i>
              </IconButton>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
