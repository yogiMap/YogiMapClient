export interface IEvent {
  _id: string;
  name: string;
  owner: {
    name: string;
    _id: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IEventStats {
  totalEvent: number;
  todayEvent: number;
  monthEvent: number;
  averageEvent: number;
}

export interface IEventQueryParams {
  limit?: number | string;
  page?: number | string;
  eventSearchParam1?: string;
  eventSearchParam2?: string;
}
