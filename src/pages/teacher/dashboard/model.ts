import { Effect, Reducer } from 'umi';
import { get } from 'lodash';

import { queryTeacherDeleteById, queryTeacherGetStats, queryTeacherSearch } from '@/pages/teacher/queries';
import { ITeacher, ITeacherStats } from '@/pages/teacher/types';
import { IPager } from '@/pages/utils/pager/types';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {
  teacherList?: ITeacher[];
  teacherStats?: ITeacherStats;
  teacherPager?: IPager;
}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    teacherSearch: Effect;
    teacherGetStats: Effect;
    teacherDeleteById: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
    set: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'TeacherDashboard',

  state: {},

  effects: {
    *teacherSearch({ payload }, { call, put }) {
      const data = yield call(queryTeacherSearch, payload);
      yield put({
        type: 'save',
        payload: {
          teacherList: get(data, 'payload.items'),
          teacherPager: get(data, 'payload.pager'),
        },
      });
    },

    *teacherGetStats(_, { call, put }) {
      const data = yield call(queryTeacherGetStats);
      yield put({
        type: 'save',
        payload: { teacherStats: data.payload },
      });
    },

    *teacherDeleteById({ payload }, { call, put }) {
      yield call(queryTeacherDeleteById, payload.teacherId);
      yield put({ type: 'teacherSearch', payload: payload.queryParams });
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
