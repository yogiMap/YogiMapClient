import { Effect, history, Reducer } from 'umi';

import {
  queryTeacherAccountCreate,
  queryTeacherAccountGetById,
  queryTeacherAccountUpdateById,
} from '@/pages/teacherAccount/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface TeacherAccountModelType {
  namespace: string;
  state: IState;
  effects: {
    create: Effect;
    getById: Effect;
    updateById: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const initialState = {};

const TeacherAccountModel: TeacherAccountModelType = {
  namespace: 'TeacherAccountForm',

  state: initialState,

  effects: {
    *create({ payload }, { call, put }) {
      const createResult = yield call(queryTeacherAccountCreate, payload);
      if (!(createResult instanceof Error)) {
        yield put({ type: 'TeacherAccountDashboard/teacherAccountSearch' });
        yield put({ type: 'Sidepanel/close' });
        yield put({ type: 'Account/auth' });
        history.push('/teacherAccount');
      }
    },

    *getById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { teacherAccountInfo: [] } });
      const data = yield call(queryTeacherAccountGetById, payload);
      yield put({
        type: 'save',
        payload: { teacherAccountInfo: data.payload },
      });
    },

    *updateById({ payload }, { call, put }) {
      const updateResult = yield call(queryTeacherAccountUpdateById, payload);
      if (!(updateResult instanceof Error)) {
        yield put({ type: 'Sidepanel/close' });
        yield put({
          type: 'TeacherAccountDashboard/teacherAccountSearch',
          payload: payload.queryParams,
        });
      }
    },

    *reset(_, { put }) {
      yield put({ type: 'save', payload: initialState });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default TeacherAccountModel;
