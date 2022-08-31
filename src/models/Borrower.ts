export interface Borrower {
  borrower: {
    address: string;
    firstName: string;
    lastName: string;
    countryCode: string;
    id: string;
  };
  loan: {
    amount: number;
    paymentEndDate: Date;
    paymentStartDate: Date;
  };
}
