import { Effect, Reducer } from 'umi';
import { get } from 'lodash';

import {
  queryStudentAccountDeleteById,
  queryStudentAccountGetStats,
  queryStudentAccountSearch,
} from '@/pages/studentAccount/queries';
import { IStudentAccount, IStudentAccountStats } from '@/pages/studentAccount/types';
import { IPager } from '@/pages/utils/pager/types';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {
  studentAccountList?: IStudentAccount[];
  studentAccountStats?: IStudentAccountStats;
  studentAccountPager?: IPager;
}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    studentAccountSearch: Effect;
    studentAccountGetStats: Effect;
    studentAccountDeleteById: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
    set: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'StudentAccountDashboard',

  state: {},

  effects: {
    *studentAccountSearch({ payload }, { call, put }) {
      yield put({ type: 'MobileMenu/close' });
      const data = yield call(queryStudentAccountSearch, payload);
      yield put({
        type: 'save',
        payload: {
          studentAccountList: get(data, 'payload.items'),
          studentAccountPager: get(data, 'payload.pager'),
        },
      });
    },

    *studentAccountGetStats(_, { call, put }) {
      const data = yield call(queryStudentAccountGetStats);
      yield put({
        type: 'save',
        payload: { studentAccountStats: data.payload },
      });
    },

    *studentAccountDeleteById({ payload }, { call, put }) {
      yield call(queryStudentAccountDeleteById, payload.studentAccountId);
      yield put({ type: 'studentAccountSearch', payload: payload.queryParams });
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
