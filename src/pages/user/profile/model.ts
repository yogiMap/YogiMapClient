import { Effect, Reducer } from 'umi';

import { queryUserUploadAvatar, queryUserGetById } from '@/pages/user/queries';
import { ICurrentUser } from '@/pages/user/types';
import defaultReducers from '@/utils/defaultReducers';
import { queryTeacherAccountGetById } from '@/pages/teacherAccount/queries';
import { queryStudentAccountGetById } from '@/pages/studentAccount/queries';

export interface IUserModelState {
  userInfo?: ICurrentUser;
}

export interface IUserModel {
  namespace: string;
  state: IUserModelState;
  effects: {
    userGetById: Effect;
    userUploadAvatar: Effect;
    teacherAccountGetById: Effect;
    studentAccountGetById: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IUserModelState>;
  };
}

const UserModel: IUserModel = {
  namespace: 'Profile',

  state: {},

  effects: {
    *userGetById({ payload }, { call, put }) {
      const response = yield call(queryUserGetById, payload);
      yield put({
        type: 'save',
        payload: { userInfo: response.payload },
      });
    },

    *teacherAccountGetById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { teacherAccountInfo: {} } });
      const data = yield call(queryTeacherAccountGetById, payload);
      yield put({
        type: 'save',
        payload: { teacherAccountInfo: data.payload },
      });
    },

    *studentAccountGetById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { studentInfo: [] } });
      const data = yield call(queryStudentAccountGetById, payload);
      yield put({
        type: 'save',
        payload: { studentAccountInfo: data.payload },
      });
    },

    *userUploadAvatar({ payload }, { call, put }) {
      yield call(queryUserUploadAvatar, payload);
      yield put({ type: 'userGetById', payload: payload.userId });
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
