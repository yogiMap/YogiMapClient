import { Effect, Reducer } from 'umi';
import { get } from 'lodash';

import { queryAddressDeleteById, queryAddressGetStats, queryAddressSearch } from '@/pages/address/queries';
import { IAddress, IAddressStats } from '@/pages/address/types';
import { IPager } from '@/pages/utils/pager/types';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {
  addressList?: IAddress[];
  addressStats?: IAddressStats;
  addressPager?: IPager;
}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    search: Effect;
    getStats: Effect;
    deleteById: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
    set: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'AddressDashboard',

  state: {},

  effects: {
    *search({ payload }, { call, put }) {
      const data = yield call(queryAddressSearch, payload);
      yield put({
        type: 'save',
        payload: {
          addressList: get(data, 'payload.items'),
          addressPager: get(data, 'payload.pager'),
        },
      });
    },

    *getStats(_, { call, put }) {
      const data = yield call(queryAddressGetStats);
      yield put({
        type: 'save',
        payload: { addressStats: data.payload },
      });
    },

    *deleteById({ payload }, { call, put }) {
      yield call(queryAddressDeleteById, payload.addressId);
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
