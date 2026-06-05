const BASE_URL = import.meta.env.VITE_BASE_URL;

console.log("base url : " , BASE_URL);

export const BASE_URLS = {
  BASE_URL,
};

export const endpoints = {
  USER: {
    GET_ORDER: "/order",
    CREATE_ORDER: "/api/v1/orders/",
    ORDER_STATUS: "/order/status",
    CANCEL_ORDER: "/order/cancel",
  },

  TENANT: {
    GET_ALL_ORDERS: "/tenant/order",
    VERIFY_TOKEN: "/tenant/token/verify",
  },
};