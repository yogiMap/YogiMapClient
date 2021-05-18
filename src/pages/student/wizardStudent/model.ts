import { Effect, history, Reducer } from 'umi';

import { queryStudentCreate } from '@/pages/student/queries';
import defaultReducers from '@/utils/defaultReducers';
import { queryUserVerifyEmailSend } from '@/pages/user/userSearch/queries';
export interface IState {}

export interface WizardStudentModelType {
  namespace: string;
  state: IState;
  effects: {
    studentCreate: Effect;
    userVerifyEmailSend: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const initialState = {};

const WizardStudentModel: WizardStudentModelType = {
  namespace: 'WizardStudentForm',

  state: initialState,

  effects: {
    *studentCreate({ payload }, { call, put }) {
      yield call(queryStudentCreate, payload);
      yield put({ type: 'Account/auth' });
      history.push('/wizardStudent');
    },

    *userVerifyEmailSend({ payload }, { call }) {
      yield call(queryUserVerifyEmailSend, payload);
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default WizardStudentModel;
