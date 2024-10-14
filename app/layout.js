import { Inter } from "next/font/google";
import "./globals.css";
import Wrapper from "@/components/common/Wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Eventing club",
  description: "Eventing club",
  icons: {
    icon: "/Eventing club logo transparent.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  );
}
