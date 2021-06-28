import { Effect, Reducer } from 'umi';
import { get } from 'lodash';

import { querySidPhoneDeleteById, querySidPhoneGetStats, querySidPhoneSearch } from '@/pages/sidPhone/queries';
import { ISidPhone, ISidPhoneStats } from '@/pages/sidPhone/types';
import { IPager } from '@/pages/utils/pager/types';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {
  sidPhoneList?: ISidPhone[];
  sidPhoneStats?: ISidPhoneStats;
  sidPhonePager?: IPager;
}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    sidPhoneSearch: Effect;
    sidPhoneGetStats: Effect;
    sidPhoneDeleteById: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
    set: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'SidPhoneDashboard',

  state: {},

  effects: {
    *sidPhoneSearch({ payload }, { call, put }) {
      const data = yield call(querySidPhoneSearch, payload);
      yield put({
        type: 'save',
        payload: {
          sidPhoneList: get(data, 'payload.items'),
          sidPhonePager: get(data, 'payload.pager'),
        },
      });
    },

    *sidPhoneGetStats(_, { call, put }) {
      const data = yield call(querySidPhoneGetStats);
      yield put({
        type: 'save',
        payload: { sidPhoneStats: data.payload },
      });
    },

    *sidPhoneDeleteById({ payload }, { call, put }) {
      yield call(querySidPhoneDeleteById, payload.sidPhoneId);
      yield put({ type: 'sidPhoneSearch', payload: payload.queryParams });
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
