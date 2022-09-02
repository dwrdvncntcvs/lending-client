export interface BorrowerWithLoan {
  borrower: {
    address: string;
    firstName: string;
    lastName: string;
    countryCode: string;
    id: string;
  };
  loan?: {
    amount?: number;
    paymentEndDate?: number;
    paymentStartDate?: number;
  };
}
