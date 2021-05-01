export interface IClassType {
  _id: string;
  name: string;
  owner: {
    name: string;
    _id: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IClassTypeStats {
  totalClassType: number;
  todayClassType: number;
  monthClassType: number;
  averageClassType: number;
}

export interface IClassTypeQueryParams {
  limit?: number | string;
  page?: number | string;
  classTypeSearchParam1?: string;
}
