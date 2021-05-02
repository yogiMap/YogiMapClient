export interface IFocus {
  _id: string;
  name: string;
  owner: {
    name: string;
    _id: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IFocusStats {
  totalFocus: number;
  todayFocus: number;
  monthFocus: number;
  averageFocus: number;
}

export interface IFocusQueryParams {
  limit?: number | string;
  page?: number | string;
  focusSearchParam1?: string;
}
