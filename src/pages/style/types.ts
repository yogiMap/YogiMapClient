export interface IStyle {
  _id: string;
  name: string;
  description: string;
  owner: {
    name: string;
    _id: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IStyleStats {
  totalStyle: number;
  todayStyle: number;
  monthStyle: number;
  averageStyle: number;
}

export interface IStyleQueryParams {
  limit?: number | string;
  page?: number | string;
  styleSearchParam1?: string;
  styleSearchParam2?: string;
}
