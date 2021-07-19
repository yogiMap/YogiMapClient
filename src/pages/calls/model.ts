import { Effect, Reducer } from 'umi';

import { generateTwilioAccessToken } from '@/pages/client/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    generateTwilioAccessToken: Effect;
  };
  reducers: {
    save: Reducer<IState>;
    set: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'PhonePad',
  state: {},
  effects: {
    *generateTwilioAccessToken({ payload }, { call, put }) {
      return yield call(generateTwilioAccessToken);
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
