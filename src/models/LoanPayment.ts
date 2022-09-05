export interface LoanPayment {
  loanId: string;
  paymentCounter: number;
  amount: number;
  id: string;
  expectedPaymentDate: Date;
  actualPaymentDate: Date;
  createdDate: Date;
  deletedDate: Date;
}

export interface TotalPayment {
  paidLoans?: PaidLoans;
  unpaidLoans?: UnpaidLoans;
  totalLoans?: TotalLoans;
}

export interface PaidLoans {
  total: number;
  count: number;
}

export interface UnpaidLoans {
  total: number;
  count: number;
}

export interface TotalLoans {
  total: number;
  count: number;
}

export type LoanModalData = {
  id: string;
  date: Date;
  amount: number;
  countryCode: string;
};
