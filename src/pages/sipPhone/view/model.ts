import { Effect, Reducer } from 'umi';

import { querySipPhoneGetById } from '@/pages/sipPhone/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    sipPhoneGetById: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'SipPhoneView',

  state: {},

  effects: {
    *sipPhoneGetById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: {} });
      const data = yield call(querySipPhoneGetById, payload);
      yield put({ type: 'save', payload: { ...data.payload } });
    },

    // *sipPhoneDeleteById({ payload }, { call, put }) {
    //   console.log(payload);
    //   yield call(querySipPhoneDeleteById, payload.sipPhoneId);
    //   yield put({ type: 'sipPhoneSearch', payload: payload.queryParams });
    // },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
