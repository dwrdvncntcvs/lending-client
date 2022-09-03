export interface Loan {
  id?: string;
  borrowerId?: string;
  amount?: number | null;
  termInMonths?: number | null;
  interestRatePerMonth?: number | null;
  termPayment?: string;
  paymentStartDate?: Date;
  paymentEndDate?: Date;
  numberOfPayments?: number | null;
  receivable?: number | null;
  status?: string;
}
