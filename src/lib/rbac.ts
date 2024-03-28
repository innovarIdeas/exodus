export const ROLE_OWNER = "owner";

export const ROLE_CLIENT = "client";

export const ROLE_STAFF = "staff";

export const ROLE_PUBLISHER = "publisher";

export const QUERY_KEY = {
  GET_ALL_BOOKS: "getAllBooks",
  GET_USER_BOOKS: "getUserBooks",
  GET_USER_TRANSACTIONS: "getUserTransactions",
  GET_USER_BOOKVARIANTS: "getUserBookVariants",
  GET_USER_ORDERS: "getUserOrders",
  GET_ALL_BOOK_VARIANTS: "getAllBookVariants",
  GET_ALL_USERS: "getAllUsers",
  GET_SINGLE_ORDER: "getSingleOrder",
  GET_SINGLE_USER: "getSingleUser",
  GET_ALL_ORDER: "getAllOrder",
  GET_ALL_TRANSACTION: "getAllTransactions",
  GET_ALL_CONSTANTS: "getAllConstants",
  GET_ALL_COUPONS: "getAllCoupons",
  GET_ALL_DISCOUNTS: "getAllCoupons",
  GET_ALL_PULISHERS: "getAllPublishers",
};

export const LAYOUT_TYPE = {
  POETRY_LAYOUT: "Poetry-Layout",
  POETRY_WITH_PICTURES: "Poetry-with-pictures",
  SIMPLE_FICTION_WITHOUT_GRAPHICS: "Simple-fiction-or-non-fiction-layout-with-no-graphics-or-image",
  SIMPLE_FICTION_WITH_GRAPHICS: "Fiction-or-non-fiction-layout-with-pictures-graphics-and-charts",
  COMIC: "comic"
};

export const ILLUSTRATION_TYPE = {
  SIMPLE_BLACK_AND_WHITE_SKETCH_AND_LINKING: "Simple-black-and-white-sketch-and-linking",
  FULL_COLOR_FLAT_2D_ILLUSTRATION: "Full-color-flat-2D-illustration",
  FULL_COLOR_FLAT_3D_ILLUSTRATION: "Full-color-3D-illustration",
  COMIC: "comic"
};

export const COVER_DESIGN = {
  GRAPHICS_WITH_ONLINE_IMAGES: "Graphics-with-online-images-or-author-supplied-image",
  GRAPHICS_WITH_PREMIUM_IMAGES: "Graphics-with-premium-paid-image",
  ARTIST_ILLUSTRATED: "Artist-Illustrated"
};

export const PRINT_STATUS = {
  WORK_IN_PROGRESS: "WORK_IN_PROGRESS",
  READY_TO_PRINT: "READY_TO_PRINT"
};

export const PAYMENT_STATUS = {
  NOT_PAID: "NOT_PAID",
  PAID: "PAID"
};

export const PAYMENT_TYPE = {
  CASH: "CASH",
  CARD: "CARD"
};

export const BOOK_FORMAT = {
  MS_WORD: "MS_WORD",
  PDF: "PDF"
};

export const BOOK_SIZE = {
  A4: "A4",
  A5: "A5"
};
