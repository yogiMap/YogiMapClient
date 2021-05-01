import { Effect, Reducer } from 'umi';
import { get } from 'lodash';

import { queryClassTypeDeleteById, queryClassTypeGetStats, queryClassTypeSearch } from '@/pages/classType/queries';
import { IClassType, IClassTypeStats } from '@/pages/classType/types';
import { IPager } from '@/pages/utils/pager/types';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {
  classTypeList?: IClassType[];
  classTypeStats?: IClassTypeStats;
  classTypePager?: IPager;
}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    classTypeSearch: Effect;
    classTypeGetStats: Effect;
    classTypeDeleteById: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
    set: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'ClassTypeDashboard',

  state: {},

  effects: {
    *classTypeSearch({ payload }, { call, put }) {
      const data = yield call(queryClassTypeSearch, payload);
      yield put({
        type: 'save',
        payload: {
          classTypeList: get(data, 'payload.items'),
          classTypePager: get(data, 'payload.pager'),
        },
      });
    },

    *classTypeGetStats(_, { call, put }) {
      const data = yield call(queryClassTypeGetStats);
      yield put({
        type: 'save',
        payload: { classTypeStats: data.payload },
      });
    },

    *classTypeDeleteById({ payload }, { call, put }) {
      yield call(queryClassTypeDeleteById, payload.classTypeId);
      yield put({ type: 'classTypeSearch', payload: payload.queryParams });
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
