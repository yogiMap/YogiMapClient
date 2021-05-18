import { Effect, Reducer } from 'umi';
import { get } from 'lodash';

import { queryStudentDeleteById, queryStudentGetStats, queryStudentSearch } from '@/pages/student/queries';
import { IStudent, IStudentStats } from '@/pages/student/types';
import { IPager } from '@/pages/utils/pager/types';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {
  studentList?: IStudent[];
  studentStats?: IStudentStats;
  studentPager?: IPager;
}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    studentSearch: Effect;
    studentGetStats: Effect;
    studentDeleteById: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
    set: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'StudentDashboard',

  state: {},

  effects: {
    *studentSearch({ payload }, { call, put }) {
      yield put({ type: 'MobileMenu/close' });
      const data = yield call(queryStudentSearch, payload);
      yield put({
        type: 'save',
        payload: {
          studentList: get(data, 'payload.items'),
          studentPager: get(data, 'payload.pager'),
        },
      });
    },

    *studentGetStats(_, { call, put }) {
      const data = yield call(queryStudentGetStats);
      yield put({
        type: 'save',
        payload: { studentStats: data.payload },
      });
    },

    *studentDeleteById({ payload }, { call, put }) {
      yield call(queryStudentDeleteById, payload.studentId);
      yield put({ type: 'studentSearch', payload: payload.queryParams });
    },

    *reset(_, { put }) {
      yield put({ type: 'set', payload: {} });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
