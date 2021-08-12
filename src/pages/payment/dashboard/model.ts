import { Effect, Reducer } from 'umi';
import { get } from 'lodash';

import { queryPaymentDeleteById, queryPaymentGetStats, queryPaymentSearch } from '@/pages/payment/queries';
import { IPayment, IPaymentStats } from '@/pages/payment/types';
import { IPager } from '@/pages/utils/pager/types';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {
  paymentList?: IPayment[];
  paymentStats?: IPaymentStats;
  paymentPager?: IPager;
}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    paymentSearch: Effect;
    paymentGetStats: Effect;
    paymentDeleteById: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
    set: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'PaymentDashboard',

  state: {},

  effects: {
    *paymentSearch({ payload }, { call, put }) {
      yield put({ type: 'MobileMenu/close' });
      const data = yield call(queryPaymentSearch, payload);
      yield put({
        type: 'save',
        payload: {
          paymentList: get(data, 'payload.items'),
          paymentPager: get(data, 'payload.pager'),
        },
      });
    },

    *paymentGetStats(_, { call, put }) {
      const data = yield call(queryPaymentGetStats);
      yield put({
        type: 'save',
        payload: { paymentStats: data.payload },
      });
    },

    *paymentDeleteById({ payload }, { call, put }) {
      yield call(queryPaymentDeleteById, payload.paymentId);
      yield put({ type: 'paymentSearch', payload: payload.queryParams });
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
