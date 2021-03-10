import { Effect, Reducer } from 'umi';
import { get } from 'lodash';

import { queryVendorTypeDeleteById, queryVendorTypeGetStats, queryVendorTypeSearch } from '@/pages/vendorType/queries';
import { IVendorType, IVendorTypeStats } from '@/pages/vendorType/types';
import { IPager } from '@/pages/utils/pager/types';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {
  vendorTypeList?: IVendorType[];
  vendorTypeStats?: IVendorTypeStats;
  vendorTypePager?: IPager;
}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    vendorTypeSearch: Effect;
    vendorTypeGetStats: Effect;
    vendorTypeDeleteById: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
    set: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'VendorTypeDashboard',

  state: {},

  effects: {
    *vendorTypeSearch({ payload }, { call, put }) {
      const data = yield call(queryVendorTypeSearch, payload);
      yield put({
        type: 'save',
        payload: {
          vendorTypeList: get(data, 'payload.items'),
          vendorTypePager: get(data, 'payload.pager'),
        },
      });
    },

    *vendorTypeGetStats(_, { call, put }) {
      const data = yield call(queryVendorTypeGetStats);
      yield put({
        type: 'save',
        payload: { vendorTypeStats: data.payload },
      });
    },

    *vendorTypeDeleteById({ payload }, { call, put }) {
      yield call(queryVendorTypeDeleteById, payload.vendorTypeId);
      yield put({ type: 'vendorTypeSearch', payload: payload.queryParams });
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
