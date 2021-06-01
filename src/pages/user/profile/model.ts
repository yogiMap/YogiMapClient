import { Effect, Reducer } from 'umi';

import { queryUserGetById } from '@/pages/user/queries';
import { ICurrentUser } from '@/pages/user/types';
import defaultReducers from '@/utils/defaultReducers';
import { queryTeacherAccountGetById, queryTeacherAccountSearch } from '@/pages/teacherAccount/queries';
import { get } from 'lodash';
import { queryStudentGetById } from '@/pages/student/queries';

export interface IUserModelState {
  userInfo?: ICurrentUser;
}

export interface IUserModel {
  namespace: string;
  state: IUserModelState;
  effects: {
    userGetById: Effect;
    teacherAccountGetById: Effect;
    teacherAccountSearch: Effect;
    studentGetById: Effect;
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
      yield put({ type: 'MobileMenu/close' });
      const response = yield call(queryUserGetById, payload);
      yield put({
        type: 'save',
        payload: { userInfo: response.payload },
      });
    },

    *teacherAccountGetById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: {} });
      const data = yield call(queryTeacherAccountGetById, payload);
      yield put({ type: 'save', payload: { ...data.payload } });
    },

    *teacherAccountSearch(_, { call, put }) {
      const data = yield call(queryTeacherAccountSearch);
      yield put({
        type: 'save',
        payload: {
          teacherAccountList: get(data, 'payload.items'),
        },
      });
    },

    *studentGetById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: {} });
      const data = yield call(queryStudentGetById, payload);
      yield put({ type: 'save', payload: { ...data.payload } });
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
