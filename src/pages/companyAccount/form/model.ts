import { Effect, history, Reducer } from 'umi';

import {
  queryCompanyAccountCreate,
  queryCompanyAccountGetById,
  queryCompanyAccountUpdateById,
} from '@/pages/companyAccount/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface CompanyAccountModelType {
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

const CompanyAccountModel: CompanyAccountModelType = {
  namespace: 'CompanyAccountForm',

  state: initialState,

  effects: {
    *create({ payload }, { call, put }) {
      const createResult = yield call(queryCompanyAccountCreate, payload);
      if (!(createResult instanceof Error)) {
        yield put({ type: 'CompanyAccountDashboard/companyAccountSearch' });
        yield put({ type: 'Sidepanel/close' });
        yield put({ type: 'Account/auth' });
        history.push('/account');
      }
    },

    *getById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { companyAccountInfo: [] } });
      const data = yield call(queryCompanyAccountGetById, payload);
      yield put({
        type: 'save',
        payload: { companyAccountInfo: data.payload },
      });
    },

    *updateById({ payload }, { call, put }) {
      const updateResult = yield call(queryCompanyAccountUpdateById, payload);
      if (!(updateResult instanceof Error)) {
        yield put({ type: 'Sidepanel/close' });
        yield put({
          type: 'CompanyAccountDashboard/companyAccountSearch',
          payload: payload.queryParams,
        });
      }
    },

    *reset(_, { put }) {
      yield put({ type: 'save', payload: initialState });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default CompanyAccountModel;
