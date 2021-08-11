import { Effect, Reducer } from 'umi';
import { queryPaymentGetById, queryPaymentGetByOrderId } from '@/pages/payment/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    paymentGetById: Effect;
    paymentGetByOrderId: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'PaymentView',

  state: {},

  effects: {
    *paymentGetById({ payload }, { call, put }) {
      yield put({ type: 'set', payload: {} });
      const data = yield call(queryPaymentGetById, payload);
      yield put({ type: 'save', payload: { ...data.payload } });
    },

    *paymentGetByOrderId({ payload }, { call, put }) {
      yield put({ type: 'save', payload: {} });
      const data = yield call(queryPaymentGetByOrderId, payload);
      yield put({ type: 'save', payload: { orderPayments: data.payload } });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
