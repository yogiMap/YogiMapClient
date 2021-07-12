import { Effect, Reducer } from 'umi';
import { get } from 'lodash';
import { Device } from 'twilio-client';

import { generateTwilioToken } from '@/pages/client/queries';
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
  twilioDevice: {};
  InboundCalls: {};
  state: IState;
  effects: {
    callClient: Effect;
    hangUpCall: Effect;
    twilioWorker: Effect;
    incomingCall: Effect;
    endCall: Effect;
  };
  reducers: {
    save: Reducer<IState>;
    set: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'InboundCalls',

  state: {},

  effects: {
    *twilioWorker({ payload }, { call, put }) {
      // try {
      // const body = { deviceName: payload };
      const data = yield call(generateTwilioToken);
      const token = data.payload;
      let device;
      device = new Device();
      device.setup(token);
      device.on('incoming', (conn) => {});
      yield put({
        type: 'save',
        payload: { twilioDevice: device, activeConnection: null, socketConnection: null, otherConnections: [] },
      });
    },

    *incomingCall({ payload }, { call, put }) {
      if (payload) {
        yield put({
          type: 'save',
          payload: {
            activeConnection: payload,
          },
        });
      }
    },

    *endCall({ payload }, { call, put }) {
      if (payload) {
        console.log('endcall-=====');
        yield put({
          type: 'save',
          payload: {
            activeConnection: null,
          },
        });
      }
    },

    *callClient({ payload }, { call, put }) {
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

    *hangUpCall(_: any, { call, put }) {
      // @ts-ignore
      Device.disconnectAll();
      yield put({
        type: 'deleteCurrentCall',
        payload: {},
      });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
