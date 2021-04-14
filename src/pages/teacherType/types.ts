export interface ITeacherType {
  _id: string;
  name: string;
  owner: {
    name: string;
    _id: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ITeacherTypeStats {
  totalTeacherType: number;
  todayTeacherType: number;
  monthTeacherType: number;
  averageTeacherType: number;
}

export interface ITeacherTypeQueryParams {
  limit?: number | string;
  page?: number | string;
  teacherTypeSearchParam1?: string;
}
