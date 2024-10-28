import moment from "moment-timezone";
import CryptoJS from "crypto-js";

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
