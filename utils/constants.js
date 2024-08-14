export const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

export const initialLength = Array.from({ length: 6 });

export const settings = {
  className: "center",
  infinite: false,
  centerPadding: "60px",
  slidesToShow: 5,
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        // dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
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
