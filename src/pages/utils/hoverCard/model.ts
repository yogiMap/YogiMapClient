import { Effect, Reducer } from 'umi';
import defaultReducers from '@/utils/defaultReducers';
import { queryUserGetById } from '@/pages/user/queries';
import { queryTeacherAccountGetById } from '@/pages/teacherAccount/queries';

export interface IState {}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    userGetById: Effect;
    teacherAccountGetById: Effect;
    //   clientGetById: Effect;
    close: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'HoverCard',

  state: {},

  effects: {
    *userGetById({ payload }, { call, put }) {
      const response = yield call(queryUserGetById, payload);
      yield put({
        type: 'save',
        payload: response.payload,
      });
    },

    *teacherAccountGetById({ payload }, { call, put }) {
      const response = yield call(queryTeacherAccountGetById, payload);
      yield put({
        type: 'save',
        payload: response.payload,
      });
    },

    *close(_, { put }) {
      yield put({ type: 'set', payload: {} });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
