export interface Iclass {
  _id: string;
  name: string;
  owner: {
    name: string;
    _id: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IclassStats {
  totalclass: number;
  todayclass: number;
  monthclass: number;
  averageclass: number;
}

export interface IclassQueryParams {
  limit?: number | string;
  page?: number | string;
  classSearchParam1?: string;
  classSearchParam2?: string;
}
