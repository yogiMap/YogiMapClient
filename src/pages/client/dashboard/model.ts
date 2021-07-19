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
      console.log(' == payload from Models==: ', payload);
      const userId = get(payload, 'userId', '');
      const userPhone = get(payload, 'userPhone', '');
      const data = yield call(generateTwilioAccessToken, userPhone);
      const twilioAccessToken = get(data, 'payload.token');
      console.log(twilioAccessToken);

      // Listen for Twilio.Device states
      function addDeviceListeners(device) {
        device.on('registered', function () {
          console.log('Twilio.Device Ready to make and receive calls!');
        });

        device.on('error', function (error) {
          console.log('Twilio.Device Error: ' + error.message);
        });

        //  device.on("incoming", handleIncomingCall);

        // device.audio.on("deviceChange", updateAllAudioDevices.bind(device));

        // Show audio selection UI if it is supported by the browser.
        // if (device.audio.isOutputSelectionSupported) {
        //   audioSelectionDiv.classList.remove("hide");
        // }
      }

      let device = new Device(twilioAccessToken, {
        debug: true,
        answerOnBridge: true,
        // Set Opus as our preferred codec. Opus generally performs better, requiring less bandwidth and
        // providing better audio quality in restrained network conditions. Opus will be default in 2.0.
        codecPreferences: ['opus', 'pcmu'],
      });
      addDeviceListeners(device);
      // Device must be registered in order to receive incoming calls
      device.register();

      // Начинаем настройку клиента Twilio
      // Device.setup(twilioAccessToken);
      // Аналог Then для функции setup
      yield put({
        type: 'save',
        payload: { currentCall: { userId } },
      });
      // @ts-ignore
      // Device.ready(function (device) {
      //   // Twilio клиент настроен успешно
      //   const params = { phoneNumber: payload };
      //   // Начинаем звонить
      //   // @ts-ignore
      //   Device.connect(params);
      //   // Аналог Then для функции connect
      //   // @ts-ignore
      //   Device.connect(function (connection) {
      //     // Пошли гудки
      //   });
      // });
      // Аналог Catch для функции setup
      // @ts-ignore
      // Device.error(function (error) {
      //   // Ошибка функции setup
      // });
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
