import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const CardHeaders = ({
  mobileHeader,
  desktopHeader,
  mobileText,
  desktopText,
  url,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 650);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex justify-between items-center px-2">
      <h1 className=" capitalize text-lg font-bold md:text-xl lg:text-3xl font-poppins">
        {isMobile ? `${mobileHeader}:` : `${desktopHeader}:`}
      </h1>
      <div className="flex justify-between items-center gap-1 ">
        <Link href={url}>
          <span className="capitalize md:text-base text-xs lg:text-lg text-[16px] font-poppins">
            {isMobile ? mobileText : desktopText}
          </span>
        </Link>
        <ChevronRightIcon className="size-2 sm:size-4  " />
      </div>
    </div>
  );
};

export default CardHeaders;
