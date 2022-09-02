export interface BorrowerWithLoan {
  borrower: Borrower;
  loan?: {
    amount?: number;
    paymentEndDate?: number;
    paymentStartDate?: number;
  };
}

export interface Borrower {
  address: string;
  firstName: string;
  lastName: string;
  countryCode: string;
  id: string;
}
