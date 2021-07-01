import moment from 'moment';

export interface IEvent {
  _id: string;
  name: string;
  teacherAccount: string;
  classType: string;
  owner: {
    name: string;
    _id: string;
  };
  createdAt: string;
  updatedAt: string;
  dueDate: moment.Moment | string;
  date: string;
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
  name?: string;
}
