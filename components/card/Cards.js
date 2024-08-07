"use client";
import { Card, CardHeader } from "@material-tailwind/react";
import Image from "next/image";

const Cards = () => {
  return (
    <Card className="w-96">
      <CardHeader floated={false} className="h-80">
        <Image src={"/pic.jpg"} alt="profile-picture" layout="fill" />
      </CardHeader>
    </Card>
  );
};
export default Cards;
