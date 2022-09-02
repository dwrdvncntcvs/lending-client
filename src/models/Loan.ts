export interface Loan {
  borrowerId?: string;
  amount?: number | null;
  termInMonths?: number | null;
  interestRatePerMonth?: number | null;
  termPayment?: string;
  paymentStartDate?: Date | null;
  paymentEndDate?: Date | null;
  numberOfPayments?: number | null;
  receivable?: number | null;
  status?: string;
}
