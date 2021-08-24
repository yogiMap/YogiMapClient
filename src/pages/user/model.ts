import { Effect, Reducer } from 'umi';
import { get } from 'lodash';
import { history } from 'umi';
import { notification } from 'antd';
// @ts-ignore
import Cookies from 'js-cookie';

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
  queryUserUpdateSelf,
  queryUserUploadAvatar,
  queryUserPasswordUpdate,
  queryUserGetById,
} from '@/pages/user/queries';

import { IUser } from '@/pages/user/userSearch/types';
import {
  queryUserDeleteById,
  queryUserImpersonate,
  queryUsersGetRolesList,
  queryUsersGetStats,
  queryUsersSearch,
  queryUserUpdateRoleById,
  queryUserUpdateSlackMemberId,
  queryUserVerifyEmailSend,
} from '@/pages/user/userSearch/queries';
import { queryTeacherAccountCreate } from '@/pages/teacherAccount/queries';

export interface UserModelType {
  namespace: string;
  state: {} | IUser;
  effects: {
    [key: string]: Effect;
  };
  reducers: {
    save: Reducer<IUser>;
    set: Reducer<IUser>;
  };
}

const UserModel: UserModelType = {
  namespace: 'User',

  state: {},

  effects: {
    *auth(_, { call, put }) {
      if (Cookies.get('user_auth')) {
        const userAuthResult = yield call(queryUserAuth);
        const user = get(userAuthResult, 'payload.user');
        if (user) {
          userAuthResult.payload.user.acl = get(userAuthResult, 'payload.acl');
          yield put({ type: 'save', payload: userAuthResult.payload.user });
        }
      }
    },

    *login({ payload }, { call, put }) {
      const data = yield call(queryUserLogin, payload);
      if (data.payload.user) {
        yield put({ type: 'auth' });

        const isTeacher = get(data, 'payload.user.isTeacher', false);
        const emailConfirmed = get(data, 'payload.user.emailConfirmation.confirmed', false);
        const userId = get(data, 'payload.userId', '');
        const teacherAccount = get(data, 'payload.user.teacherAccount', '');
        //const studentAccount = get(data, 'payload.user.studentAccount', '');

        // if (!teacherAccount && !studentAccount) history.push('/welcome');
        if ((isTeacher && teacherAccount) || !emailConfirmed) history.push('/user/onboarding/teacher');
        else if (isTeacher && !emailConfirmed) history.push('/user/onboarding/student');
        else history.push(`/teacherAccount/${userId}`);
      }
    },

    *register({ payload }, { call, put }) {
      const createResult = yield call(queryUserRegister, payload);
      if (!(createResult instanceof Error)) {
        notification.destroy();
        yield put({ type: 'login', payload });

        //conditionally redirect on onboarding depending on if teacherAccountId or studentAccountId already exists or not
        // payload.teacherAccountId ||  payload.studentAccountId ? history.push('/welcome') : history.push('/settings/profile/${userId}');
        payload.teacherAccountId ? history.push('/onboarding/teacher') : history.push('/onboarding/student');
      }
    },

    *logout(_, { call, put }) {
      yield put({ type: 'reset' });
      yield put({ type: 'TeacherAccountForm/reset' });
      yield put({ type: 'ClientInfo/reset' });
      yield put({ type: 'ClientDashboard/reset' });
      yield put({ type: 'User/reset' });
      yield call(queryUserLogout);
      history.push('/');
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

    // Todo Переименовать на что-то более подходящее GetSelf или удалить с заменой на auth
    *userGetInfo(_, { call, put }) {
      const data = yield call(queryUserAuth);
      yield put({ type: 'save', payload: { userInfo: data.payload } });
    },

    *userUpdateSelf({ payload }, { call, put }) {
      const response = yield call(queryUserUpdateSelf, payload);
      yield put({ type: 'save', payload: response.data });
      yield put({ type: 'userGetInfo' });
    },

    // Todo Найти места вызова и унести отсюда
    *createTeacher({ payload }, { call, put }) {
      yield call(queryTeacherAccountCreate, payload);
      yield put({ type: 'TeacherAccountDashboard/teacherAccountSearch' });
      yield put({ type: 'userGetInfo' });
    },

    *updatePassword({ payload }, { call, put }) {
      const response = yield call(queryUserPasswordUpdate, payload);
      yield put({ type: 'save', payload: response.data });
    },

    *usersSearch({ payload }, { call, put }) {
      const data = yield call(queryUsersSearch, payload);
      yield put({
        type: 'save',
        payload: { usersList: data.items, usersPagination: data.pagination },
      });
    },

    *usersGetStats(_, { call, put }) {
      const data = yield call(queryUsersGetStats);
      yield put({
        type: 'save',
        payload: { usersStats: data.payload },
      });
    },

    *usersGetRolesList(_, { call, put }) {
      const data = yield call(queryUsersGetRolesList);
      yield put({
        type: 'save',
        payload: { usersRolesList: data.payload },
      });
    },

    *usersUpdateRoleById({ payload }, { call, put }) {
      yield call(queryUserUpdateRoleById, payload);
      yield put({ type: 'usersGetStats' });
    },

    *userVerifyEmailSend({ payload }, { call }) {
      yield call(queryUserVerifyEmailSend, payload);
    },

    *userDeleteById({ payload }, { call, put }) {
      yield put({ type: 'Sidepanel/close' });
      yield call(queryUserDeleteById, payload);
      yield put({
        type: 'removeUserFromUsersList',
        payload: payload,
      });
      yield put({ type: 'usersGetStats' });
    },

    *userGetSlackId({ payload }, { call, put }) {
      yield call(queryUserUpdateSlackMemberId, payload.userId);
    },

    *userImpersonate({ payload }, { call, put }) {
      const data = yield call(queryUserImpersonate, payload.userId);
      const userId = get(data, 'userId');
      const token = get(data, 'token');

      yield put({ type: 'User/setInitialState' });
      yield put({ type: 'User/reset' });
      yield put({ type: 'reset' });

      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);

      history.push(`/profile/${userId}`);
      yield put({ type: 'User/auth' });
    },

    *userImpersonateGetBack({ payload }, { put }) {
      const adminToken = get(payload, 'adminToken', '');
      const adminId = get(payload, 'adminId', '');

      localStorage.setItem('token', adminToken);
      localStorage.setItem('userId', adminId);
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminId');

      history.push(`/profile/${adminId}`);
      yield put({ type: 'User/auth' });
      yield put({ type: 'User/userGetById', payload: adminId });
    },

    *userGetById({ payload }, { call, put }) {
      const response = yield call(queryUserGetById, payload);
      yield put({
        type: 'save',
        payload: { userInfo: response.payload },
      });
    },

    *userUploadAvatar({ payload }, { call, put }) {
      yield call(queryUserUploadAvatar, payload);
      //TODO:Reload page
      yield put({ type: 'userGetInfo' });
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
