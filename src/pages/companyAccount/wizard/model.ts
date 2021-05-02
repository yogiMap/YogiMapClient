import { Effect, history, Reducer } from 'umi';

import { queryCompanyAccountCreate } from '@/pages/companyAccount/queries';
import defaultReducers from '@/utils/defaultReducers';
import { queryUserVerifyEmailSend } from '@/pages/user/userSearch/queries';
export interface IState {}

export interface WizardModelType {
  namespace: string;
  state: IState;
  effects: {
    companyAccountCreate: Effect;
    userVerifyEmailSend: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const initialState = {};

const WizardModel: WizardModelType = {
  namespace: 'WizardForm',

  state: initialState,

  effects: {
    *companyAccountCreate({ payload }, { call, put }) {
      yield call(queryCompanyAccountCreate, payload);
      yield put({ type: 'Account/auth' });
      history.push('/wizard');
    },

    *userVerifyEmailSend({ payload }, { call }) {
      yield call(queryUserVerifyEmailSend, payload);
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default WizardModel;
