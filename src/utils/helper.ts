import { COUNTRY } from "./variables";

const getCurrency = (country: string) => {
  let currency: string;

  if (country.toUpperCase() === COUNTRY.PH) currency = "Php";

  if (country.toUpperCase() === COUNTRY.CA) currency = "$";

  return currency!;
};

export { getCurrency };
