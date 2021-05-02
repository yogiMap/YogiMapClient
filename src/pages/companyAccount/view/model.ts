import { Effect, Reducer } from 'umi';

import { queryCompanyAccountGetById } from '@/pages/companyAccount/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    companyAccountGetById: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'CompanyAccountView',

  state: {},

  effects: {
    *companyAccountGetById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: {} });
      const data = yield call(queryCompanyAccountGetById, payload);
      yield put({ type: 'save', payload: { ...data.payload } });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
