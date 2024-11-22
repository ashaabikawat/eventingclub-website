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
      <h1 className=" capitalize text-lg md:text-xl lg:text-3xl font-bold">
        {isMobile ? `${mobileHeader}:` : `${desktopHeader}:`}
      </h1>
      <div className="flex justify-between items-center gap-1 ">
        <Link href={url}>
          <span className="capitalize md:text-base lg:text-lg text-[16px]">
            {isMobile ? mobileText : desktopText}
          </span>
        </Link>
        <ChevronRightIcon className="size-4 sm:size-4  " />
      </div>
    </div>
  );
};

export default CardHeaders;
