import moment from "moment";

export const convertDate = (date: number) =>
  moment(date).format("MMMM Do YYYY");
