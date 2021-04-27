import { Effect, Reducer } from 'umi';
import { get } from 'lodash';

import { queryStyleDeleteById, queryStyleGetStats, queryStyleSearch } from '@/pages/style/queries';
import { IStyle, IStyleStats } from '@/pages/style/types';
import { IPager } from '@/pages/utils/pager/types';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {
  styleList?: IStyle[];
  styleStats?: IStyleStats;
  stylePager?: IPager;
}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    styleSearch: Effect;
    styleGetStats: Effect;
    styleDeleteById: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
    set: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'StyleDashboard',

  state: {},

  effects: {
    *styleSearch({ payload }, { call, put }) {
      const data = yield call(queryStyleSearch, payload);
      yield put({
        type: 'save',
        payload: {
          styleList: get(data, 'payload.items'),
          stylePager: get(data, 'payload.pager'),
        },
      });
    },

    *styleGetStats(_, { call, put }) {
      const data = yield call(queryStyleGetStats);
      yield put({
        type: 'save',
        payload: { styleStats: data.payload },
      });
    },

    *styleDeleteById({ payload }, { call, put }) {
      yield call(queryStyleDeleteById, payload.styleId);
      yield put({ type: 'styleSearch', payload: payload.queryParams });
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
