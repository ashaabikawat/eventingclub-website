import { URL } from "./constants";

export const getBanner = `${URL}/webiste/homepage/getAllBannerSliderData`;

export const artists = {
  GET_ALL: `${URL}/webiste/artist/getAllArtistData`,
  ARTIST_BY_ID: `${URL}/webiste/artist/getEventsByArtist`,
  SEARCH_KEYWORD: `${URL}/webiste/artist/getArtistBySearchKeyword`,
};

export const categories = {
  GET_ALL: `${URL}/webiste/category/getAllCategoryData`,
  SEARCH_KEYWORD: `${URL}/webiste/category/getCategoriesBySearchKeyword`,
  GET_BY_ID: `${URL}/webiste/category/getCategoryEvents`,
};

export const venues = {
  GET_ALL: `${URL}/webiste/venue/getAllVenueData`,
  SEARCH_KEYWORD: `${URL}/webiste/venue/getVenuesBySearchKeyword`,
  GET_BY_ID: `${URL}/webiste/venue/getVenueEvents`,
};

export const generateOPT = `${URL}/webiste/customer/generateotp`;

export const validateOtp = `${URL}/webiste/customer/validatotp`;

export const registerUser = `${URL}/webiste/customer/updateCustomerProfile`;

export const getCustomerById = `${URL}/webiste/customer/getCustomerDataById`;

export const updateCustomer = `${URL}/webiste/customer/updateCustomerProfile`;

export const onlineEvents = {
  GET_ALL: `${URL}/webiste/events/getAllOnlineEvents`,
};

export const upcomingEvents = {
  GET_ALL: `${URL}/webiste/events/getAllUpcomingEvents`,
};

export const featuredEvents = {
  GET_ALL: `${URL}/webiste/events/getAllFeaturedEvents`,
};

export const genre = {
  GET_ALL: `${URL}/webiste/genre/getAllGenreData`,
};

export const events = {
  GET_ALL: `${URL}/webiste/events/getEventDetailsById`,
};
