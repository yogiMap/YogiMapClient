import { Effect, Reducer } from 'umi';
import { get } from 'lodash';

import { querySipPhoneDeleteById, querySipPhoneGetStats, querySipPhoneSearch } from '@/pages/telephony/queries';
import { ISipPhone, ISipPhoneStats } from '@/pages/telephony/types';
import { IPager } from '@/pages/utils/pager/types';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {
  sipPhoneList?: ISipPhone[];
  sipPhoneStats?: ISipPhoneStats;
  sipPhonePager?: IPager;
}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    sipPhoneSearch: Effect;
    sipPhoneGetStats: Effect;
    sipPhoneDeleteById: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
    set: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'SipPhoneDashboard',

  state: {},

  effects: {
    *sipPhoneSearch({ payload }, { call, put }) {
      const data = yield call(querySipPhoneSearch, payload);
      yield put({
        type: 'save',
        payload: {
          sipPhoneList: get(data, 'payload.items'),
          sipPhonePager: get(data, 'payload.pager'),
        },
      });
    },

    *sipPhoneGetStats(_, { call, put }) {
      const data = yield call(querySipPhoneGetStats);
      yield put({
        type: 'save',
        payload: { sipPhoneStats: data.payload },
      });
    },

    *sipPhoneDeleteById({ payload }, { call, put }) {
      yield call(querySipPhoneDeleteById, payload.sipPhoneId);
      //yield put({ type: 'sipPhoneSearch', payload: payload.queryParams });
      yield put({ type: 'telephony/teacherAccountGetSipPhone', payload: payload.teacherAccount });
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
