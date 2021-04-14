import { Effect, Reducer } from 'umi';
import { get } from 'lodash';

import { queryTeacherTypeDeleteById, queryTeacherTypeGetStats, queryTeacherTypeSearch } from '@/pages/teacherType/queries';
import { ITeacherType, ITeacherTypeStats } from '@/pages/teacherType/types';
import { IPager } from '@/pages/utils/pager/types';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {
  teacherTypeList?: ITeacherType[];
  teacherTypeStats?: ITeacherTypeStats;
  teacherTypePager?: IPager;
}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    teacherTypeSearch: Effect;
    teacherTypeGetStats: Effect;
    teacherTypeDeleteById: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
    set: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'TeacherTypeDashboard',

  state: {},

  effects: {
    *teacherTypeSearch({ payload }, { call, put }) {
      const data = yield call(queryTeacherTypeSearch, payload);
      yield put({
        type: 'save',
        payload: {
          teacherTypeList: get(data, 'payload.items'),
          teacherTypePager: get(data, 'payload.pager'),
        },
      });
    },

    *teacherTypeGetStats(_, { call, put }) {
      const data = yield call(queryTeacherTypeGetStats);
      yield put({
        type: 'save',
        payload: { teacherTypeStats: data.payload },
      });
    },

    *teacherTypeDeleteById({ payload }, { call, put }) {
      yield call(queryTeacherTypeDeleteById, payload.teacherTypeId);
      yield put({ type: 'teacherTypeSearch', payload: payload.queryParams });
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
