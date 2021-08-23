import { Effect, history, Reducer } from 'umi';

import { queryStudentAccountCreate } from '@/pages/studentAccount/queries';
import defaultReducers from '@/utils/defaultReducers';
import { queryUserVerifyEmailSend } from '@/pages/user/userSearch/queries';
export interface IState {}

export interface WizardStudentAccountModelType {
  namespace: string;
  state: IState;
  effects: {
    studentAccountCreate: Effect;
    userVerifyEmailSend: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const initialState = {};

const WizardStudentAccountModel: WizardStudentAccountModelType = {
  namespace: 'WizardStudentAccountForm',

  state: initialState,

  effects: {
    *studentAccountCreate({ payload }, { call, put }) {
      yield call(queryStudentAccountCreate, payload);
      yield put({ type: 'User/auth' });
      history.push('/wizardStudentAccount');
    },

    *userVerifyEmailSend({ payload }, { call }) {
      yield call(queryUserVerifyEmailSend, payload);
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default WizardStudentAccountModel;
