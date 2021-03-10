import { Effect, history, Reducer } from 'umi';

import { queryVendorTypeCreate, queryVendorTypeGetById, queryVendorTypeUpdateById } from '@/pages/vendorType/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface VendorTypeModelType {
  namespace: string;
  state: IState;
  effects: {
    create: Effect;
    getById: Effect;
    updateById: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const initialState = {};

const VendorTypeModel: VendorTypeModelType = {
  namespace: 'VendorTypeForm',

  state: initialState,

  effects: {
    *create({ payload }, { call, put }) {
      yield call(queryVendorTypeCreate, payload);
      yield put({ type: 'VendorTypeDashboard/vendorTypeSearch' });
      yield put({ type: 'Sidepanel/close' });
      history.push('/vendorType');
    },

    *getById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { vendorTypeInfo: {} } });
      const data = yield call(queryVendorTypeGetById, payload);
      yield put({ type: 'save', payload: { vendorTypeInfo: data.payload } });
    },

    *updateById({ payload }, { call, put }) {
      yield call(queryVendorTypeUpdateById, payload);
      yield put({ type: 'Sidepanel/close' });
      yield put({ type: 'VendorTypeDashboard/vendorTypeSearch', payload: payload.queryParams });
    },

    *reset(_, { put }) {
      yield put({ type: 'save', payload: initialState });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default VendorTypeModel;
