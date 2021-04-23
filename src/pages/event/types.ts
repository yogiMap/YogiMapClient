export interface Ievent {
  _id: string;
  name: string;
  owner: {
    name: string;
    _id: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IeventStats {
  totalevent: number;
  todayevent: number;
  monthevent: number;
  averageevent: number;
}

export interface IeventQueryParams {
  limit?: number | string;
  page?: number | string;
  eventSearchParam1?: string;
  eventSearchParam2?: string;
}
