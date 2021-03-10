import { Effect, Reducer } from 'umi';

import { queryVendorTypeGetById } from '@/pages/vendorType/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    vendorTypeGetById: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'VendorTypeView',

  state: {},

  effects: {
    *vendorTypeGetById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: {} });
      const data = yield call(queryVendorTypeGetById, payload);
      yield put({ type: 'save', payload: { ...data.payload } });
    },

    // *vendorTypeDeleteById({ payload }, { call, put }) {
    //   console.log(payload);
    //   yield call(queryVendorTypeDeleteById, payload.vendorTypeId);
    //   yield put({ type: 'vendorTypeSearch', payload: payload.queryParams });
    // },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
