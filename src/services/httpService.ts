import axios, { AxiosRequestHeaders, HeadersDefaults } from "axios";

const getRequest = async (url: string, headers?: AxiosRequestHeaders) => {
  return await axios({
    method: "GET",
    url,
    responseType: "json",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
  });
};
export { getRequest };
