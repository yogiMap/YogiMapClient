import { Effect, Reducer } from 'umi';

import { querySidPhoneGetById } from '@/pages/sidPhone/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    sidPhoneGetById: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'SidPhoneView',

  state: {},

  effects: {
    *sidPhoneGetById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: {} });
      const data = yield call(querySidPhoneGetById, payload);
      yield put({ type: 'save', payload: { ...data.payload } });
    },

    // *sidPhoneDeleteById({ payload }, { call, put }) {
    //   console.log(payload);
    //   yield call(querySidPhoneDeleteById, payload.sidPhoneId);
    //   yield put({ type: 'sidPhoneSearch', payload: payload.queryParams });
    // },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
