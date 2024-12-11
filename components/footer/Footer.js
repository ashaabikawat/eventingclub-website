"use client";
import { IconButton } from "@material-tailwind/react";
import Image from "next/image";
import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import Link from "next/link";
import { decryptData } from "@/utils/constants";
import { useSelector } from "react-redux";

const Footer = () => {
  const passphrase = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
  const auth = useSelector((store) => store.uSess);
  const cust_id = decryptData(auth?.xA1, passphrase);
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

  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  // console.log(isMenuOpen);

  return (
    <>
      <div
        className="px-10 md:py-8 py-10 text-white h-full md:pb-16 pb-20 font-nunito"
        style={{ backgroundColor: "#2f3e93" }}
      >
        <div className="flex justify-between  md:flex-row flex-col gap-6">
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
          <div className="">
            <ul className="flex md:flex-row flex-col  md:text-xl text-base md:gap-12 gap-6 flex-wrap">
              <div className="md:items-center flex gap-2 flex-col">
                <li className="text-base font-semibold ">
                  <Link href="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li className="text-base font-semibold ">
                  <Link href="/venue" className="hover:underline">
                    Venue
                  </Link>
                </li>
                <li className="text-base font-semibold ">
                  <Link href="/artists" className="hover:underline">
                    Artist
                  </Link>
                </li>
              </div>

              <div className="md:items-center flex gap-2 flex-col">
                <li className="text-base font-semibold">
                  <Link href="/aboutus " className="hover:underline">
                    About us
                  </Link>
                </li>
                <li className="text-base font-semibold">
                  <Link href="/list-with-us" className="hover:underline">
                    List with us
                  </Link>
                </li>
                <li className="text-base font-semibold ">
                  <Link href="/list-with-us" className="hover:underline">
                    Contact us
                  </Link>
                </li>
              </div>

              <div className="md:items-center flex gap-2 flex-col">
                <li className="text-base font-semibold ">
                  <Link href="/artists" className="hover:underline">
                    Terms and Conditions
                  </Link>
                </li>
                <li className="text-base font-semibold ">
                  <Link href="/artists" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
              </div>

              {/* <li className="text-base font-semibold flex gap-1 flex-col ">
                <Link href="/aboutus " className="hover:underline">
                  About us
                </Link>
                <Link href="/about  " className="hover:underline">
                  About us
                </Link>
              </li>
              <li className="text-base font-semibold flex gap-1 flex-col">
                <Link href="/list-with-us" className="hover:underline">
                  List with us
                </Link>
                <Link href="/list-with-us" className="hover:underline">
                  List with us
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Social Icons */}
          <div className="flex items-center md:justify-center gap-4">
            {socialIcons.map((icon) => (
              <Link key={icon.id} href={icon.url} target="_blank">
                <IconButton
                  size="base"
                  className="bg-white border-transparent rounded-full md:p-6 "
                  variant="outlined"
                >
                  <i
                    className={`fab ${icon.icon} md:fa-xl fa-lg text-blue-900`}
                  ></i>
                </IconButton>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:hidden block mt-16 font-nunito ">
        <div className="bg-white w-full border-t-[1px] border-gray-300 h-16 fixed bottom-0 z-30 ">
          <div className="relative">
            <div className="flex  h-full items-center justify-between py-4 px-8 ">
              <Link href={`/`}>
                <div className="flex flex-col items-center">
                  <FaHome size={16} className="text-gray-600" />
                  <span className="text-sm">Home</span>
                </div>
              </Link>
              <div className="flex flex-col items-center ">
                <FaUserLarge size={16} className="text-gray-600" />
                <span className="text-sm">Profile</span>
              </div>
              <div className="flex flex-col  items-center ">
                <FaUserLarge size={16} className="text-gray-600" />
                <span className="text-sm">Profile</span>
              </div>

              <Link href={`/userDetails/${cust_id}`}>
                <div className="flex flex-col  items-center">
                  <FaUserLarge size={16} className="text-gray-600" />
                  <span className="text-sm">Profile</span>
                </div>
              </Link>
            </div>
            {/* {isMenuOpen && (
              <>
                <div className="bg-white h-auto w-40 rounded-lg  shadow-lg absolute bottom-[75px] right-2 p-4">
                  <ul className="flex flex-col gap-2">
                    <li className="capitalize">settings</li>
                    <li className="capitalize">your tickets</li>
                  </ul>
                </div>
              </>
            )} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
