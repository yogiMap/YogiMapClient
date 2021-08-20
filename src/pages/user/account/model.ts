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
  queryUserLogout,
} from '@/pages/user/queries';

import { IUserAccount } from '@/pages/user/userSearch/types';

export interface UserModelType {
  namespace: string;
  state: {} | IUserAccount;
  effects: {
    login: Effect;
    register: Effect;
    auth: Effect;
    logout: Effect;
    passwordReset: Effect;
    passwordResetNew: Effect;
    isValidResetPasswordLink: Effect;
    emailVerify: Effect;
    sendSupportEmail: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IUserAccount>;
    set: Reducer<IUserAccount>;
  };
}

const initialState = {};

const UserModel: UserModelType = {
  namespace: 'Account',

  state: initialState,

  effects: {
    *auth(_, { call, put }) {
      const userAuthResult = yield call(queryUserAuth);
      if (userAuthResult instanceof Error) {
        yield put({ type: 'logout' });
      } else if (userAuthResult.payload.user) {
        userAuthResult.payload.user.acl = userAuthResult.payload.acl;
        yield put({ type: 'save', payload: userAuthResult.payload.user });
      }
    },

    *login({ payload }, { call, put }) {
      const data = yield call(queryUserLogin, payload);
      if (data.payload.user) {
        yield put({ type: 'auth' });
        // const isTeacher = get(data, 'payload.user.isTeacher', false);
        // const emailConfirmed = get(data, 'payload.user.emailConfirmation.confirmed', false);
        const userId = get(data, 'payload.userId', '');
        const teacherAccount = get(data, 'payload.user.teacherAccount', '');
        const studentAccount = get(data, 'payload.user.studentAccount', '');

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
        payload.teacherAccountId ? history.push('/user/wizard/') : history.push('/user/wizardStudentAccount');
      }
    },

    *logout(_, { call, put }) {
      localStorage.clear();
      yield put({ type: 'reset' });
      yield put({ type: 'TeacherAccountForm/reset' });
      yield put({ type: 'ClientInfo/reset' });
      yield put({ type: 'ClientDashboard/reset' });
      yield put({ type: 'Profile/reset' });
      yield call(queryUserLogout);
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

    *reset(_, { put }) {
      yield put({ type: 'set', payload: {} });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default UserModel;
