import { Effect, Reducer } from 'umi';

import { queryAddressGetById } from '@/pages/address/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    getById: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'AddressView',

  state: {},

  effects: {
    *getById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: {} });
      const data = yield call(queryAddressGetById, payload);
      yield put({ type: 'save', payload: { ...data.payload } });
    },

    // *addressDeleteById({ payload }, { call, put }) {
    //   console.log(payload);
    //   yield call(queryAddressDeleteById, payload.addressId);
    //   yield put({ type: 'addressSearch', payload: payload.queryParams });
    // },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
