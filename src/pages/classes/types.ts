export interface IClasses {
  _id: string;
  name: string;

  code: string;
  address: string;
  date: string;
  teacherAccount: string;

  owner: {
    name: string;
    _id: string;
  };
  createdAt: string;
  updatedAt: string;

  styleSearch: () => void;
  teacherAccountSearch: () => void;
  classTypeSearch: () => void;
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
