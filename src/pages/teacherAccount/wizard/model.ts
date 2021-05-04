import { Effect, history, Reducer } from 'umi';

import { queryTeacherAccountCreate } from '@/pages/teacherAccount/queries';
import defaultReducers from '@/utils/defaultReducers';
import { queryUserVerifyEmailSend } from '@/pages/user/userSearch/queries';
export interface IState {}

export interface WizardModelType {
  namespace: string;
  state: IState;
  effects: {
    teacherAccountCreate: Effect;
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
    *teacherAccountCreate({ payload }, { call, put }) {
      yield call(queryTeacherAccountCreate, payload);
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
