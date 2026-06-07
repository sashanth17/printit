import { BASE_URLS } from "../config/endpoints.js";

export async function useFetch({
  endpoint,
  method = "GET",
  body = null,
  headers = {},
  otherData = {},
}) {
  try {
    const config = {
      method,
      ...otherData,
    };

    if (body) {
      // Handle FormData uploads
      if (body instanceof FormData) {
        config.body = body;

        config.headers = {
          ...headers,
        };
      } else {
        config.body = JSON.stringify(body);

        config.headers = {
          "Content-Type": "application/json",
          ...headers,
        };
      }
    } else {
      config.headers = {
        ...headers,
      };
    }

    const response = await fetch(
      `${BASE_URLS.BASE_URL}${endpoint}`,
      config
    );
    // console.log("response : " , response);
    const data = await response.json();

    return {
      success: response.ok,
      status: response.status,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}