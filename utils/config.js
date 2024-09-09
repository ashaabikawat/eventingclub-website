import { URL } from "./constants";

export const getBanner = `${URL}/webiste/homepage/getAllBannerSliderData`;

export const artists = {
  GET_ALL: `${URL}/webiste/artist/getAllArtistData`,
  ARTIST_BY_ID: `${URL}/artist/getbyId`,
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
};

export const generateOPT = `${URL}/webiste/customer/generateotp`;

export const validateOtp = `${URL}/webiste/customer/validatotp`;

export const registerUser = `${URL}/webiste/customer/updateCustomerProfile`;

export const getCustomerById = `${URL}/webiste/customer/getCustomerDataById`;

export const updateCustomer = `${URL}/webiste/customer/updateCustomerProfile`;

export const getAllOnlineEvents = `${URL}/webiste/events/getAllOnlineEvents`;

export const getAllUpcomingEvents = `${URL}/webiste/events/getAllUpcomingEvents`;

export const getAllFeaturedEvents = `${URL}/webiste/events/getAllFeaturedEvents`;
