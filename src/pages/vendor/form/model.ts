import { Effect, history, Reducer } from 'umi';

import { queryVendorCreate, queryVendorGetById, queryVendorUpdateById } from '@/pages/vendor/queries';
import defaultReducers from '@/utils/defaultReducers';
import { queryVendorTypeSearch } from '@/pages/vendorType/queries';
import { get } from 'lodash';

export interface IState {}

export interface VendorModelType {
  namespace: string;
  state: IState;
  effects: {
    create: Effect;
    getById: Effect;
    updateById: Effect;
    vendorTypeSearch: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const initialState = {};

const VendorModel: VendorModelType = {
  namespace: 'VendorForm',

  state: initialState,

  effects: {
    *create({ payload }, { call, put }) {
      yield call(queryVendorCreate, payload);
      yield put({ type: 'VendorDashboard/vendorSearch' });
      yield put({ type: 'Sidepanel/close' });
      history.push('/vendor');
    },

    *getById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { vendorInfo: {} } });
      const data = yield call(queryVendorGetById, payload);
      yield put({ type: 'save', payload: { vendorInfo: data.payload } });
    },

    *updateById({ payload }, { call, put }) {
      yield call(queryVendorUpdateById, payload);
      yield put({ type: 'Sidepanel/close' });
      yield put({ type: 'VendorDashboard/vendorSearch', payload: payload.queryParams });
    },

    *vendorTypeSearch(_, { call, put }) {
      const data = yield call(queryVendorTypeSearch);
      yield put({
        type: 'save',
        payload: {
          vendorTypeList: get(data, 'payload.items'),
        },
      });
    },

    *reset(_, { put }) {
      yield put({ type: 'save', payload: initialState });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default VendorModel;
