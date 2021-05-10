import { Effect, Reducer } from 'umi';
import { get } from 'lodash';

import {
  queryTeacherAccountDeleteById,
  queryTeacherAccountGetStats,
  queryTeacherAccountSearch,
} from '@/pages/teacherAccount/queries';
import { ITeacherAccount, ITeacherAccountStats } from '@/pages/teacherAccount/types';
import { IPager } from '@/pages/utils/pager/types';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {
  teacherAccountList?: ITeacherAccount[];
  teacherAccountStats?: ITeacherAccountStats;
  teacherAccountPager?: IPager;
}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    teacherAccountSearch: Effect;
    teacherAccountGetStats: Effect;
    teacherAccountDeleteById: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
    set: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'TeacherAccountDashboard',

  state: {},

  effects: {
    *teacherAccountSearch({ payload }, { call, put }) {
      yield put({ type: 'MobileMenu/close' });
      const data = yield call(queryTeacherAccountSearch, payload);
      yield put({
        type: 'save',
        payload: {
          teacherAccountList: get(data, 'payload.items'),
          teacherAccountPager: get(data, 'payload.pager'),
        },
      });
    },

    *teacherAccountGetStats(_, { call, put }) {
      const data = yield call(queryTeacherAccountGetStats);
      yield put({
        type: 'save',
        payload: { teacherAccountStats: data.payload },
      });
    },

    *teacherAccountDeleteById({ payload }, { call, put }) {
      yield call(queryTeacherAccountDeleteById, payload.teacherAccountId);
      yield put({ type: 'teacherAccountSearch', payload: payload.queryParams });
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
