import moment from "moment";

export const convertDate = (date: Date) =>
  moment(date).format("MMMM Do YYYY");
