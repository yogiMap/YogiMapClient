export interface IPayment {
  _id: string;
  code: string;
  invoiceCode: string;
  paymentNumber: string;
  order: {
    name: string;
    _id: string;
  };

  client: {
    name: string;
    _id: string;
  };

  amount: number;
  checkNumber: string;
  creditCardLast4: string;
  creditCardStatus: string;
  paymentType: string;
  creditCardEmail: string;

  owner: {
    name: string;
    _id: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IPaymentStats {
  totalPayment: number;
  todayPayment: number;
  monthPayment: number;
  averagePayment: number;
}

export interface IPaymentQueryParams {
  limit?: number | string;
  page?: number | string;
  paymentSearchParam1?: string;
  paymentSearchParam2?: string;
}
