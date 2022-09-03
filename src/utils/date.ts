import moment from "moment";

export const convertDate = (date: Date) => {
  const newDate = new Date(date);

  return moment(newDate).format("MMMM D, YYYY");
};
