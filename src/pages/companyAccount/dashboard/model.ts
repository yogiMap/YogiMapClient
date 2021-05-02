import { Effect, Reducer } from 'umi';
import { get } from 'lodash';

import {
  queryCompanyAccountDeleteById,
  queryCompanyAccountGetStats,
  queryCompanyAccountSearch,
} from '@/pages/companyAccount/queries';
import { ICompanyAccount, ICompanyAccountStats } from '@/pages/companyAccount/types';
import { IPager } from '@/pages/utils/pager/types';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {
  companyAccountList?: ICompanyAccount[];
  companyAccountStats?: ICompanyAccountStats;
  companyAccountPager?: IPager;
}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    companyAccountSearch: Effect;
    companyAccountGetStats: Effect;
    companyAccountDeleteById: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
    set: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'CompanyAccountDashboard',

  state: {},

  effects: {
    *companyAccountSearch({ payload }, { call, put }) {
      const data = yield call(queryCompanyAccountSearch, payload);
      yield put({
        type: 'save',
        payload: {
          companyAccountList: get(data, 'payload.items'),
          companyAccountPager: get(data, 'payload.pager'),
        },
      });
    },

    *companyAccountGetStats(_, { call, put }) {
      const data = yield call(queryCompanyAccountGetStats);
      yield put({
        type: 'save',
        payload: { companyAccountStats: data.payload },
      });
    },

    *companyAccountDeleteById({ payload }, { call, put }) {
      yield call(queryCompanyAccountDeleteById, payload.companyAccountId);
      yield put({ type: 'companyAccountSearch', payload: payload.queryParams });
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
