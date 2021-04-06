export interface IClasses {
  _id: string;
  name: string;
  owner: {
    name: string;
    _id: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IClassesStats {
  totalClasses: number;
  todayClasses: number;
  monthClasses: number;
  averageClasses: number;
}

export interface IClassesQueryParams {
  limit?: number | string;
  page?: number | string;
  classesSearchParam1?: string;
  classesSearchParam2?: string;
}
