import moment from "moment-timezone";
import CryptoJS from "crypto-js";
import { HiOutlineTicket } from "react-icons/hi2";
import { FaListCheck } from "react-icons/fa6";
import { BsTicketDetailed } from "react-icons/bs";
import { MdOutlineAppRegistration } from "react-icons/md";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { FaRegCircleUser } from "react-icons/fa6";
import { RiUserVoiceLine } from "react-icons/ri";
import { BsCardList } from "react-icons/bs";
import { GrUserExpert } from "react-icons/gr";
import { AiOutlineSolution } from "react-icons/ai";
import { MdOutlineManageAccounts } from "react-icons/md";
import { LuAreaChart } from "react-icons/lu";
import { FaMobileAlt } from "react-icons/fa";
import { FaQrcode } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { RiCustomerService2Fill } from "react-icons/ri";

export const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

export const initialLength = Array.from({ length: 6 });

export const formatDateForInput = (isoDateString) => {
  const date = new Date(isoDateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const settings = {
  className: "center",
  centerMode: false,
  infinite: false,
  centerPadding: "60px",
  slidesToShow: 4,
  swipeToSlide: true,
  arrows: true,
  // dots: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: false,
        // dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: false,
        // dots: true,
      },
    },
    {
      breakpoint: 400,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 2,
        infinite: false,
        // dots: true,
      },
    },
  ],
};

export const profileMenu = [
  {
    menus: {
      id: 1,
      name: "account details",
      menu: [
        {
          id: 1,
          name: "email address",
          value: "xyz@gmail.com",
          type: "text",
        },
        {
          id: 2,
          name: "phone number",
          value: "9892651557",
          type: "text",
        },
      ],
    },
  },
  {
    menus: {
      id: 2,
      name: "personal details",
      menu: [
        {
          id: 1,
          name: "full name",
          value: "ashaa",
          type: "text",
        },
        {
          id: 2,
          name: "birthdate",
          value: "",
          type: "date",
        },
      ],
    },
  },
  {
    menus: {
      id: 3,
      name: "Address",
      menu: [
        {
          id: 1,
          name: "Address",
          value: "",
          type: "text",
        },
        {
          id: 2,
          name: "pincode",
          value: "",
          type: "text",
        },
        {
          id: 3,
          name: "state",
          value: "",
          type: "text",
        },
        {
          id: 4,
          name: "city",
          value: "",
          type: "text",
        },
      ],
    },
  },
];

export const indianLanguages = [
  { value: "English", label: "English" },
  { value: "Hindi", label: "Hindi" },
  { value: "Marathi", label: "Marathi" },
  { value: "Tamil", label: "Tamil" },
  { value: "Telugu", label: "Telugu" },
  { value: "Bhojpuri", label: "Bhojpuri" },
  { value: "Gujarati", label: "Gujarati" },
  { value: "Assamese", label: "Assamese" },
  { value: "Bengali", label: "Bengali" },
  { value: "Kannada", label: "Kannada" },
  { value: "Kashmiri", label: "Kashmiri" },
  { value: "Konkani", label: "Konkani" },
  { value: "Malayalam", label: "Malayalam" },
  { value: "Maithili", label: "Maithili" },
  { value: "Manipuri", label: "Manipuri" },
  { value: "Nepali", label: "Nepali" },
  { value: "Odia", label: "Odia" },
  { value: "Punjabi", label: "Punjabi" },
  { value: "Sanskrit", label: "Sanskrit" },
  { value: "Sindhi", label: "Sindhi" },
  { value: "Urdu", label: "Urdu" },
  { value: "Bihari", label: "Bihari" },
  { value: "Chhattisgarhi", label: "Chhattisgarhi" },
  { value: "Dogri", label: "Dogri" },
  { value: "Garo", label: "Garo" },
  { value: "Haryanvi", label: "Haryanvi" },
  { value: "Ho", label: "Ho" },
  { value: "Khasi", label: "Khasi" },
  { value: "Kurukh", label: "Kurukh" },
  { value: "Lushai", label: "Lushai" },
  { value: "Magahi", label: "Magahi" },
  { value: "Meitei", label: "Meitei" },
  { value: "Mizo", label: "Mizo" },
  { value: "Nagamese", label: "Nagamese" },
  { value: "Santali", label: "Santali" },
  { value: "Tulu", label: "Tulu" },
];

export const dropdownOptions = [
  {
    id: 1,
    Value: "Today",
  },
  {
    id: 2,
    Value: "Tomorrow",
  },
  {
    id: 3,
    Value: "This weekend",
  },
];

export const dateFilter = (option) => {
  const currentMoment = moment().tz("Asia/Kolkata");
  let TodayStartDateTimeStr, TodayEndDatetimeStr;
  switch (option) {
    case "Today":
      // Format the date and time
      const startOfDay = currentMoment
        .startOf("day")
        .format("YYYY-MM-DDTHH:mm:ss");
      const endOfDay = currentMoment.endOf("day").format("YYYY-MM-DDTHH:mm:ss");
      TodayStartDateTimeStr = `${startOfDay}+00:00`;
      TodayEndDatetimeStr = `${endOfDay}+00:00`;
      return { TodayStartDateTimeStr, TodayEndDatetimeStr };

    case "Tomorrow":
      const tomorrowStartOfDay = currentMoment
        .clone()
        .add(1, "day")
        .startOf("day")
        .format("YYYY-MM-DDTHH:mm:ss");
      const tomorrowEndOfDay = currentMoment
        .clone()
        .add(1, "day")
        .endOf("day")
        .format("YYYY-MM-DDTHH:mm:ss");
      TodayStartDateTimeStr = `${tomorrowStartOfDay}+00:00`;
      TodayEndDatetimeStr = `${tomorrowEndOfDay}+00:00`;
      return { TodayStartDateTimeStr, TodayEndDatetimeStr };

    case "This weekend":
      const weekStartOff = currentMoment
        .clone()
        .subtract(6, "days")
        .startOf("day")
        .format("YYYY-MM-DDTHH:mm:ss");
      const weekEndOf = currentMoment
        .endOf("day")
        .format("YYYY-MM-DDTHH:mm:ss");
      TodayStartDateTimeStr = `${weekStartOff}+00:00`;
      TodayEndDatetimeStr = `${weekEndOf}+00:00`;
      return { TodayStartDateTimeStr, TodayEndDatetimeStr };

    case "This month":
      const monthStartOff = currentMoment
        .clone()
        .subtract(1, "months")
        .startOf("month")
        .format("YYYY-MM-DDTHH:mm:ss");
      const monthEndOf = currentMoment
        .endOf("month")
        .format("YYYY-MM-DDTHH:mm:ss");
      TodayStartDateTimeStr = `${monthStartOff}+00:00`;
      TodayEndDatetimeStr = `${monthEndOf}+00:00`;
      return { TodayStartDateTimeStr, TodayEndDatetimeStr };
  }
};

// encrypt function
export const encryptData = (data, secretKey) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};

// Decryption function
// export const decryptData = (encryptedData, secretKey) => {
//   const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
//   return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
// };

export const decryptData = (encryptedData, secretKey) => {
  if (!encryptedData) return null; // Return null if data is empty

  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);

    if (!decryptedString) {
      console.warn("Decrypted data is empty or malformed.");
      return null;
    }

    return JSON.parse(decryptedString); // Parse and return JSON if valid
  } catch (error) {
    console.error("Decryption error:", error);
    return null; // Return null on error
  }
};

export const services = [
  {
    id: 1,
    heading: "Event Ticketing",
    icon: <HiOutlineTicket size={50} />,
    text: "Seamless online ticketing system allowing organizers to create, sell, and manage tickets. Secure and user-friendly interface for ticket purchases by attendees.",
  },
  {
    id: 2,
    heading: "Club Guestlist Management",
    icon: <FaListCheck size={50} />,
    text: "Efficient guestlist management for exclusive events and club entries.Easy tracking of RSVPs and streamlined check-ins for a smooth entry experience.",
  },
  {
    id: 3,
    heading: "Offline Ticketing Solution",
    icon: <BsTicketDetailed size={50} />,
    text: "Dedicated portal for offline promoters to generate tickets without upfront payment.Comprehensive tracking of offline ticket sales and promoter performance.",
  },
  {
    id: 4,
    heading: "Event Registration",
    icon: <MdOutlineAppRegistration size={50} />,
    text: "Facilitation of registration for free events such as exhibitions, college events, and other similar activities.Easy-to-use registration forms and attendee tracking to manage participation in non-ticketed events.",
  },
  {
    id: 5,
    heading: "Manager Panel",
    icon: <MdOutlineAdminPanelSettings size={50} />,
    text: "Centralized dashboard for organizers to access sales reports, manage events, and analyze performance metrics.Tools for event promotion, ticket tracking, and revenue management.",
  },
  {
    id: 6,
    heading: "Customer Profile and Login",
    icon: <FaRegCircleUser size={50} />,
    text: "Personalized login for customers to view booking history, manage tickets, and update profile information.Enhanced convenience and user experience for ticket buyers.",
  },
  {
    id: 7,
    heading: "Marketing and Promotion",
    icon: <RiUserVoiceLine size={50} />,
    text: "Extensive social media presence and expertise in running targeted ads to maximize event awareness.Comprehensive marketing strategies to increase visibility and drive ticket sales.",
  },
  {
    id: 8,
    heading: "Event Listing and Promotion",
    icon: <BsCardList size={50} />,
    text: "Dedicated page for organizers to list and promote their events.Various promotional options to enhance event visibility and attract a larger audience.",
  },
];

export const benefits = [
  {
    id: 1,
    heading: "User-Friendly Experience",
    text: "Both organizers and attendees benefit from an intuitive and seamless user experience.",
    icon: <GrUserExpert size={30} />,
  },
  {
    id: 2,
    heading: "Comprehensive Solutions",
    text: " A one-stop platform for managing online and offline ticketing, guestlist management, event registration, and promotion.",
    icon: <AiOutlineSolution size={30} />,
  },
  {
    id: 3,
    heading: "Enhanced Visibility",
    text: "Strong social media presence and targeted marketing strategies to ensure maximum event reach.",
    icon: <LuAreaChart size={30} />,
  },
  {
    id: 4,
    heading: "Efficient Management",
    text: "Centralized tools and analytics for organizers to manage events effectively and make data-driven decisions.",
    icon: <MdOutlineManageAccounts size={30} />,
  },
  {
    id: 5,
    heading: "Dedicated Promoter App",
    text: "Give your promoters easy access and manage offline sales with our dedicated promoter app.",
    icon: <FaMobileAlt size={30} />,
  },
  {
    id: 6,
    heading: "Inbuilt Scanner",
    text: "Our one-step scanning system ensures hassle-free check-ins without any technical knowledge required, with real-time tracking for your peace of mind.",
    icon: <FaQrcode size={30} />,
  },
];

export const testimonials = [
  {
    id: 1,
    text: "The Lorem Ipsum Company has been an integral part of our content marketing success. We have seen a notable increase in organic leads since we began using their services in 2012.",
    name: "Roland Weedon",
    post: "CEO & Founder, Essex Mortgage",
    image: "/beertill.jpg",
  },
  {
    id: 2,
    text: "My busy schedule leaves little, if any, time for blogging and social media. The Lorem Ipsum Company has been a huge part of helping me grow my business through organic search and content marketing.",
    name: "Kelsi Gordon",
    post: "Insurance Broker, Brashears Insurance",
    image: "/hofstett.jpg",
  },
  {
    id: 3,
    text: "Jeramy and his team at the Lorem Ipsum Company whipped my website into shape just in time for tax season. I was excited by the results and am proud to direct clients to my website once again.",
    name: "Seth Gewirtz",
    post: "CEO, SNG Accountants",
    image: "/side-view-young-woman-nature_23-2148877481.jpg",
  },
  {
    id: 4,
    text: "Professional, responsive, and able to keep up with ever-changing demand and tight deadlines: That's how I would describe Jeramy and his team at The Lorem Ipsum Company. When it comes to content marketing, you'll definitely get the 5-star treatment from the Lorem Ipsum Company!",
    name: "Tasha Zuzalek",
    post: "Facebook Project Manager",
    image: "/bertolje.jpg",
  },
  {
    id: 5,
    text: "I was skeptical of SEO and content marketing at first, but the Lorem Ipsum Company not only proved itself financially speaking, but the response I have received from customers is incredible. The work is top-notch and I consistently outrank all my competitors on Google.!",
    name: "Mike Brashears",
    post: "Owner, Brashears Insurance",
    image: "/schaermi.jpg",
  },
];

export const faqs = [
  {
    id: 1,
    question: "How much does it cost to list an event on Eventing Club?",
    answer:
      "Listing an event is free. We charge a small fee per ticket sold. Contact us for more details.",
  },
  {
    id: 2,
    question: "Can I manage both online and offline ticket sales?",
    answer:
      "Yes! Eventing Club offers an offline portal specifically for promoters, along with online ticketing, all accessible via a single manager panel.",
  },
  {
    id: 3,
    question: "How does the inbuilt scanner work for check-ins?",
    answer:
      "Our scanner app allows you to scan tickets with a single step, ensuring no duplicate entries. It requires no expertise and provides live tracking of attendance.",
  },
  {
    id: 4,
    question: "What types of events can I list?",
    answer:
      "We support a range of events, including concerts, club events, exhibitions, college festivals, corporate gatherings, and private events.",
  },
  {
    id: 5,
    question: "How does the promoter app work?",
    answer:
      "Our promoter app allows authorized promoters to log in and manage ticketing offline, giving you a seamless experience for both online and offline sales.",
  },
  {
    id: 6,
    question: "How can I track my event’s performance?",
    answer:
      "You’ll have access to real-time data analytics in your manager panel, showing ticket sales, promoter performance, and live attendance updates.",
  },
];

export const features = [
  {
    id: 1,
    heading: "Online and Offline Ticketing",
    text: "Our platform supports both online booking and a flexible, cost-effective offline portal for promoters.",
    icon: <HiOutlineTicket size={30} />,
  },
  {
    id: 2,
    heading: "Dedicated Promoter App",
    text: "Give your promoters easy access and manage offline sales with our dedicated promoter app.",
    icon: <FaMobileAlt size={30} />,
  },
  {
    id: 3,
    heading: "Inbuilt Scanner",
    text: "Our one-step scanning system ensures hassle-free check-ins without any technical knowledge required, with real-time tracking for your peace of mind.",
    icon: <FaQrcode size={30} />,
  },
  {
    id: 4,
    heading: "Live Reporting and Analytics",
    text: "Stay on top of your event’s performance with real-time sales, check-ins, and promoter activity tracking.",
    icon: <FaChartLine size={30} />,
  },
  {
    id: 5,
    heading: "24/7 Customer Support",
    text: " Our dedicated support team is available 24/7 to assist you with any queries or issues, ensuring a smooth event experience.",
    icon: <RiCustomerService2Fill size={30} />,
  },
  {
    id: 6,
    heading: "Streamline Your Event Management",
    text: "Simplify your event planning process with our intuitive tools for managing attendee lists, scheduling, and resource allocation.",
    icon: <FaCalendarAlt size={30} />,
  },
];
