import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";

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

const putRequest = async (
  url: string,
  data: any,
  headers?: AxiosRequestHeaders
) => {
  return await axios({
    method: "PUT",
    url,
    data,
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
  });
};
export { getRequest, putRequest };
