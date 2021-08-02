import { Effect, Reducer } from 'umi';

import { generateTwilioAccessToken } from '@/pages/client/queries';
import defaultReducers from '@/utils/defaultReducers';
import { get } from 'lodash';

export interface IState {}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    generateTwilioAccessToken: Effect;
    callChangeStatus: Effect;
    callStart: Effect;
  };
  reducers: {
    save: Reducer<IState>;
    set: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'PhoneWidget',
  state: {},
  effects: {
    *generateTwilioAccessToken({ payload }, { call, put }) {
      const data = yield call(generateTwilioAccessToken);
      yield put({
        type: 'save',
        payload: { token: get(data, 'payload.token') },
      });
    },

    *callStart({ payload }, { put }) {
      yield put({ type: 'save', payload: { status: 'outgoing', ...payload } });
    },

    *callChangeStatus({ payload }, { put }) {
      yield put({ type: 'save', payload: { status: payload } });
    },

    // *open({ payload }, { put }) {
    //   yield put({ type: 'save', payload: { open: true, ...payload } });
    // },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
