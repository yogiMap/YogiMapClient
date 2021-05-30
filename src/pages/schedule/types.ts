export interface IOrder {
  _id: string;
  client: string;
  order: string;
  orderLine1: string;
  orderLine2: string;
  city: string;
  state: string;
  countryName: string;
  countryCode: string;
  zipCode: string;
  orderAdditionalInfo: string;

  createdAt: string;
  updatedAt: string;
}

export interface IOrderStats {
  totalOrder: number;
  todayOrder: number;
  monthOrder: number;
  averageOrder: number;
}

export interface IOrderQueryParams {
  limit?: number | string;
  page?: number | string;
  orderSearchParam1?: string;
  orderSearchParam2?: string;
}
