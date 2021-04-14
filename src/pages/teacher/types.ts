export interface ITeacher {
  _id: string;
  name: string;
  owner: {
    name: string;
    _id: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ITeacherStats {
  totalTeacher: number;
  todayTeacher: number;
  monthTeacher: number;
  averageTeacher: number;
}

export interface ITeacherQueryParams {
  limit?: number | string;
  page?: number | string;
  teacherSearchParam1?: string;
}
