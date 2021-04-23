import { Effect, Reducer } from 'umi';
import { get } from 'lodash';

import { queryClassDeleteById, queryClassGetStats, queryClassSearch } from '@/pages/class/queries';
import { IClass, IClassStats } from '@/pages/class/types';
import { IPager } from '@/pages/utils/pager/types';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {
  classList?: IClass[];
  classStats?: IClassStats;
  classPager?: IPager;
}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    classSearch: Effect;
    classGetStats: Effect;
    classDeleteById: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
    set: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'ClassDashboard',

  state: {},

  effects: {
    *classSearch({ payload }, { call, put }) {
      const data = yield call(queryClassSearch, payload);
      yield put({
        type: 'save',
        payload: {
          classList: get(data, 'payload.items'),
          classPager: get(data, 'payload.pager'),
        },
      });
    },

    *classGetStats(_, { call, put }) {
      const data = yield call(queryClassGetStats);
      yield put({
        type: 'save',
        payload: { classStats: data.payload },
      });
    },

    *classDeleteById({ payload }, { call, put }) {
      yield call(queryClassDeleteById, payload.classId);
      yield put({ type: 'classSearch', payload: payload.queryParams });
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
