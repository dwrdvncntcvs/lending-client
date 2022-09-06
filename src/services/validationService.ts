export const checkPaymentDate = (date: Date, loanDate: Date): boolean => {
  const date1 = new Date(date);
  const date2 = new Date(loanDate);

  return date1.toDateString() !== date2.toDateString() ? true : false;
};

export const checkPaymentAmount = (
  amount: number,
  loanAmount: number
): boolean => {
  return +amount !== +loanAmount ? true : false;
};
