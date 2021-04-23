import { Effect, Reducer } from 'umi';
import { get } from 'lodash';

import { queryclassDeleteById, queryclassGetStats, queryclassSearch } from '@/pages/class/queries';
import { Iclass, IclassStats } from '@/pages/class/types';
import { IPager } from '@/pages/utils/pager/types';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {
  classList?: Iclass[];
  classStats?: IclassStats;
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
  namespace: 'classDashboard',

  state: {},

  effects: {
    *classSearch({ payload }, { call, put }) {
      const data = yield call(queryclassSearch, payload);
      yield put({
        type: 'save',
        payload: {
          classList: get(data, 'payload.items'),
          classPager: get(data, 'payload.pager'),
        },
      });
    },

    *classGetStats(_, { call, put }) {
      const data = yield call(queryclassGetStats);
      yield put({
        type: 'save',
        payload: { classStats: data.payload },
      });
    },

    *classDeleteById({ payload }, { call, put }) {
      yield call(queryclassDeleteById, payload.classId);
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
