import { Effect, Reducer } from 'umi';
import { get } from 'lodash';
import { Device } from 'twilio-client';

import {
  generateTwilioToken,
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
    callUser: Effect;
    hangUpPhone: Effect;
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
      const data = yield call(generateTwilioToken, userPhone);
      // Начинаем настройку клиента Twilio
      Device.setup(data.payload);
      // Аналог Then для функции setup
      yield put({
        type: 'save',
        payload: { currentCall: { userId } },
      });
      // @ts-ignore
      Device.ready(function (device) {
        // Twilio клиент настроен успешно
        const params = { phoneNumber: payload };
        // Начинаем звонить
        // @ts-ignore
        Device.connect(params);
        // Аналог Then для функции connect
        // @ts-ignore
        Device.connect(function (connection) {
          // Пошли гудки
        });
      });
      // Аналог Catch для функции setup
      // @ts-ignore
      Device.error(function (error) {
        // Ошибка функции setup
      });
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
