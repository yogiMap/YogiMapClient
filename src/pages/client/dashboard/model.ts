import { Effect, Reducer } from 'umi';
import { get } from 'lodash';
import { Device } from '@twilio/voice-sdk';

import {
  generateTwilioAccessToken,
  queryClientDeleteById,
  queryClientGetStats,
  queryClientSearch,
} from '@/pages/client/queries';
import { IClient, IClientStats } from '@/pages/client/types';
import { IPager } from '@/pages/utils/pager/types';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {
  clientList?: IClient[];
  clientStats?: IClientStats;
  clientPager?: IPager;
}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    search: Effect;
    getStats: Effect;
    deleteById: Effect;
    reset: Effect;
    hangUpPhone: Effect;
    callUser: Effect;
  };
  reducers: {
    save: Reducer<IState>;
    set: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'ClientDashboard',

  state: {},

  effects: {
    *callUser({ payload }, { call, put }) {
      const userId = get(payload, 'userId', '');
      const userPhone = get(payload, 'userPhone', '');

      const data = yield call(generateTwilioAccessToken, userPhone);

      const twilioAccessToken = get(data, 'payload.token');
      return twilioAccessToken;
    },

    *hangUpPhone(_: any, { call, put }) {
      // @ts-ignore
      Device.disconnectAll();
      yield put({
        type: 'deleteCurrentCall',
        payload: {},
      });
    },

    *search({ payload }, { call, put }) {
      yield put({ type: 'MobileMenu/close' });
      const data = yield call(queryClientSearch, payload);
      yield put({
        type: 'save',
        payload: {
          clientList: get(data, 'payload.items'),
          clientPager: get(data, 'payload.pager'),
        },
      });
    },

    *getStats(_, { call, put }) {
      const data = yield call(queryClientGetStats);
      yield put({
        type: 'save',
        payload: { clientStats: data.payload },
      });
    },

    *deleteById({ payload }, { call, put }) {
      yield call(queryClientDeleteById, payload.clientId);
      yield put({ type: 'search', payload: payload.queryParams });
      yield put({ type: 'getStats' });
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
