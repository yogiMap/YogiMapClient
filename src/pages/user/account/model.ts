import { Effect, Reducer } from 'umi';
import { get } from 'lodash';
import { history } from 'umi';
import { notification } from 'antd';

import defaultReducers from '@/utils/defaultReducers';

import {
  queryUserLogin,
  queryUserRegister,
  queryUserPasswordReset,
  queryIsValidResetPasswordLink,
  queryUserPasswordResetNew,
  queryUserAuth,
  queryUserEmailVerify,
  queryUserSendSupportEmail,
} from '@/pages/user/queries';

import { IUserAccount } from '@/pages/user/userSearch/types';

export interface UserModelType {
  namespace: string;
  state: {} | IUserAccount;
  effects: {
    setInitialState: Effect;
    login: Effect;
    register: Effect;
    auth: Effect;
    logout: Effect;
    passwordReset: Effect;
    passwordResetNew: Effect;
    isValidResetPasswordLink: Effect;
    emailVerify: Effect;
    sendSupportEmail: Effect;
  };
  reducers: {
    save: Reducer<IUserAccount>;
  };
}

const initialState = {};

const UserModel: UserModelType = {
  namespace: 'Account',

  state: initialState,

  effects: {
    *auth(_, { call, put }) {
      const token = localStorage.getItem('token');

      if (token) {
        const userAuthResult = yield call(queryUserAuth);

        if (userAuthResult instanceof Error) {
          yield put({ type: 'logout' });
        }

        yield put({ type: 'save', payload: userAuthResult.payload });
      }
    },

    // очень сомнительная штука
    *setInitialState(_, { put }) {
      yield put({ type: 'save', payload: initialState });
    },

    *login({ payload }, { call, put }) {
      const data = yield call(queryUserLogin, payload);
      const userId = get(data, 'payload.userId', '');
      const name = get(data, 'payload.user.name', '');
      const token = get(data, 'payload.token', '');
      const teacherAccount = get(data, 'payload.user.teacherAccount', '');
      const studentAccount = get(data, 'payload.user.studentAccount', '');
      const emailConfirmed = get(data, 'payload.user.emailConfirmation.confirmed', false);

      if (name && token && userId) {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);

        yield put({ type: 'auth' });

        if (!teacherAccount && !studentAccount) history.push('/welcome');
        else if (teacherAccount) history.push(`/teacherAccount/${userId}`);
        else if (studentAccount) history.push(`/settings/studentAccount/${userId}`);
      }
    },

    *register({ payload }, { call, put }) {
      const createResult = yield call(queryUserRegister, payload);
      if (!(createResult instanceof Error)) {
        notification.destroy();
        yield put({ type: 'login', payload });
        //conditionally redirect on wizard depending on if teacherAccountId or studentAccountId already exists or not
        // payload.teacherAccountId ||  payload.studentAccountId ? history.push('/welcome') : history.push('/settings/profile/${userId}');
      }
    },

    *logout(_, { put }) {
      localStorage.clear();
      yield put({ type: 'set', payload: {} });
      history.push('/user/login');
    },

    *passwordReset({ payload }, { call }) {
      yield call(queryUserPasswordReset, payload);
      history.push('/user/password/reset/mailed');
    },

    *passwordResetNew({ payload }, { call }) {
      const result = yield call(queryUserPasswordResetNew, payload);
      if (!(result instanceof Error)) {
        history.push('/user/login');
      }
    },

    *sendSupportEmail({ payload }, { call }) {
      const result = yield call(queryUserSendSupportEmail, payload);
      if (!(result instanceof Error)) {
        history.push('/support');
      }
    },

    *isValidResetPasswordLink({ payload }, { call, put }) {
      const result = yield call(queryIsValidResetPasswordLink, payload);
      if (!(result instanceof Error)) {
        yield put({ type: 'save', payload: { isValidResetLink: result.success } });
      }
    },

    *emailVerify({ payload }, { call }) {
      yield call(queryUserEmailVerify, payload);
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default UserModel;
