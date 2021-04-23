export interface IClass {
  _id: string;
  name: string;
  owner: {
    name: string;
    _id: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IClassStats {
  totalClass: number;
  todayClass: number;
  monthClass: number;
  averageClass: number;
}

export interface IClassQueryParams {
  limit?: number | string;
  page?: number | string;
  classSearchParam1?: string;
  classSearchParam2?: string;
}
