import { Effect, Reducer } from 'umi';
import {
  queryUserAuth,
  queryUserUpdateById,
  queryUserPasswordUpdate,
  queryUserUploadAvatar,
} from '@/pages/user/queries';
import defaultReducers from '@/utils/defaultReducers';
import { IUser } from '@/pages/user/userSearch/types';

export interface IUserModelState {
  userInfo?: IUser;
}

export interface IUserModelType {
  namespace: string;
  state: IUserModelState;
  effects: {
    userGetInfo: Effect;
    reset: Effect;
    userUpdateById: Effect;
    updatePassword: Effect;
    userUploadAvatar: Effect;
  };
  reducers: {
    save: Reducer<IUserModelState>;
  };
}

const UserModel: IUserModelType = {
  namespace: 'Settings',

  state: {},

  effects: {
    *userGetInfo(_, { call, put }) {
      yield put({ type: 'MobileMenu/close' });
      const data = yield call(queryUserAuth);
      yield put({ type: 'save', payload: { userInfo: data.payload } });
    },

    *reset(_, { put }) {
      yield put({ type: 'save', payload: {} });
    },

    *userUpdateById({ payload }, { call, put }) {
      const response = yield call(queryUserUpdateById, payload);
      yield put({ type: 'save', payload: response.data });
      yield put({ type: 'userGetInfo' });
    },

    *updatePassword({ payload }, { call, put }) {
      const response = yield call(queryUserPasswordUpdate, payload);
      yield put({ type: 'save', payload: response.data });
    },

    *userUploadAvatar({ payload }, { call, put }) {
      yield call(queryUserUploadAvatar, payload);
      //TODO:Reload page
      const userId = payload.get('userId');
      yield put({ type: 'userGetById', payload: userId });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default UserModel;
