import { Effect, history, Reducer } from 'umi';

import { queryTeacherAccountCreate } from '@/pages/teacherAccount/queries';
import defaultReducers from '@/utils/defaultReducers';
import { queryUserVerifyEmailSend } from '@/pages/user/userSearch/queries';
import { queryUserUpdateSelf } from '@/pages/user/queries';

export interface IState {}

export interface OnboardingModelType {
  namespace: string;
  state: IState;
  effects: {
    [key: string]: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const initialState = {};

const OnboardingModel: OnboardingModelType = {
  namespace: 'OnboardingForm',

  state: initialState,

  effects: {
    *teacherAccountCreate({ payload }, { call, put }) {
      yield call(queryTeacherAccountCreate, payload);
      yield put({ type: 'User/auth' });
      // history.push('/onboarding/teacher');
    },

    *userStepSubmit({ payload }, { call, put }) {
      yield call(queryUserUpdateSelf, payload);
      yield put({ type: 'User/auth' });
      // history.push('/onboarding/business');
    },

    *userVerifyEmailSend({ payload }, { call }) {
      yield call(queryUserVerifyEmailSend, payload);
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default OnboardingModel;
