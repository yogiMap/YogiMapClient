import { Effect, Reducer } from 'umi';
import { get } from 'lodash';

import { queryClassesDeleteById, queryClassesGetStats, queryClassesSearch } from '@/pages/classes/queries';
import { IClasses, IClassesStats } from '@/pages/classes/types';
import { IPager } from '@/pages/utils/pager/types';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {
  classesList?: IClasses[];
  classesStats?: IClassesStats;
  classesPager?: IPager;
}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    classesSearch: Effect;
    classesGetStats: Effect;
    classesDeleteById: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
    set: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'ClassesDashboard',

  state: {},

  effects: {
    *classesSearch({ payload }, { call, put }) {
      yield put({ type: 'MobileMenu/close' });
      const data = yield call(queryClassesSearch, payload);
      yield put({
        type: 'save',
        payload: {
          classesList: get(data, 'payload.items'),
          classesPager: get(data, 'payload.pager'),
        },
      });
    },

    *classesGetStats(_, { call, put }) {
      const data = yield call(queryClassesGetStats);
      yield put({
        type: 'save',
        payload: { classesStats: data.payload },
      });
    },

    *classesDeleteById({ payload }, { call, put }) {
      yield call(queryClassesDeleteById, payload.classesId);
      yield put({ type: 'classesSearch', payload: payload.queryParams });
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
