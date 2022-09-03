import { g_axios } from "../configurations/axios";

const COUNTRY = {
  PH: "PH",
  CA: "CA",
};

const URL = {
  lending: g_axios.defaults.baseURL,
};

export { COUNTRY, URL };
