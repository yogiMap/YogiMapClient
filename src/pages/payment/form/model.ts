import { Effect, history, Reducer } from 'umi';

import { queryPaymentCreate, queryPaymentGetById, queryPaymentUpdateById } from '@/pages/payment/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface PaymentModelType {
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

const PaymentModel: PaymentModelType = {
  namespace: 'PaymentForm',

  state: initialState,

  effects: {
    *create({ payload }, { call, put }) {
      yield call(queryPaymentCreate, payload);
      yield put({ type: 'PaymentDashboard/paymentSearch' });
      yield put({ type: 'PaymentDashboard/paymentGetStats' });
      yield put({ type: 'Sidepanel/close' });
      history.push('/payment');
    },

    *getById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { paymentInfo: {} } });
      const data = yield call(queryPaymentGetById, payload);
      yield put({ type: 'save', payload: { paymentInfo: data.payload } });
    },

    *updateById({ payload }, { call, put }) {
      yield call(queryPaymentUpdateById, payload);
      yield put({ type: 'Sidepanel/close' });
      yield put({ type: 'PaymentDashboard/paymentSearch', payload: payload.queryParams });
    },

    *reset(_, { put }) {
      yield put({ type: 'save', payload: initialState });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default PaymentModel;
