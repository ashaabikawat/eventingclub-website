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
    {
      id: 1,
      name: "Facebook",
      icon: "fa-facebook",
      url: "https://www.facebook.com/eventingclubec/",
    },
    {
      id: 1,
      name: "twitter",
      icon: "fa-twitter",
      url: "https://x.com/eventingclub/",
    },
    {
      id: 1,
      name: "whatsapp",
      icon: "fa-whatsapp",
      url: "https://wa.me/919730589111",
    },
  ];

  return (
    <div
      className="px-10 md:py-8 py-6 text-white"
      style={{ backgroundColor: "#2f3e93" }}
    >
      <div className="flex justify-between items-center md:flex-row flex-col gap-6">
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <span className="sr-only">Logo</span>
          <Link href="/">
            <div className="cursor-pointer relative md:h-20 md:w-32 h-14 w-24">
              <Image
                src="/Frame 8107.png"
                alt="logo"
                layout="fill"
                className="absolute"
                objectFit="contain"
              />
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex-grow">
          <ul className="flex justify-center items-center md:text-xl text-base md:gap-10 gap-4 flex-wrap">
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
              <Link href="/aboutus">About us</Link>
            </li>
            <li>
              <Link href="/list-with-us">List with us</Link>
            </li>
          </ul>
        </div>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-4">
          {socialIcons.map((icon) => (
            <Link key={icon.id} href={icon.url} target="_blank">
              <IconButton
                size="lg"
                className="bg-white border-transparent rounded-full p-6"
                variant="outlined"
              >
                <i
                  className={`fab ${icon.icon} md:fa-lg fa-xl text-blue-900`}
                ></i>
              </IconButton>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
