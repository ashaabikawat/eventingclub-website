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
