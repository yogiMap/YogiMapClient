import { Effect, history, Reducer } from 'umi';

import {
  queryStudentAccountCreate,
  queryStudentAccountGetById,
  queryStudentAccountUpdateById,
} from '@/pages/studentAccount/queries';
import defaultReducers from '@/utils/defaultReducers';
import { queryClassTypeSearch } from '@/pages/classType/queries';
import { queryClassesSearch } from '@/pages/classes/queries';
import { queryEventSearch } from '@/pages/event/queries';
import { queryStyleSearch } from '@/pages/style/queries';
import { get } from 'lodash';
import { queryUserLogin } from '@/pages/user/queries';

export interface IState {}

export interface StudentAccountModelType {
  namespace: string;
  state: IState;
  effects: {
    create: Effect;
    getById: Effect;
    updateById: Effect;
    classTypeSearch: Effect;
    classesSearch: Effect;
    eventSearch: Effect;
    styleSearch: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const initialState = {};

const StudentAccountModel: StudentAccountModelType = {
  namespace: 'StudentAccountForm',

  state: initialState,

  effects: {
    *create({ payload }, { call, put }) {
      const data = yield call(queryUserLogin, payload);
      const userId = get(data, 'userId', '');

      const createResult = yield call(queryStudentAccountCreate, payload);

      if (!(createResult instanceof Error)) {
        yield put({ type: 'StudentAccountDashboard/studentAccountSearch' });
        yield put({ type: 'Sidepanel/close' });
        yield put({ type: 'User/auth' });
        history.push(`/settings/studentAccount/${userId}`);
      }
    },

    *getById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { studentAccountInfo: [] } });
      const data = yield call(queryStudentAccountGetById, payload);
      yield put({
        type: 'save',
        payload: { studentAccountInfo: data.payload },
      });
    },

    *updateById({ payload }, { call, put }) {
      const updateResult = yield call(queryStudentAccountUpdateById, payload);
      if (!(updateResult instanceof Error)) {
        yield put({ type: 'Sidepanel/close' });
        yield put({
          type: 'StudentAccountDashboard/studentAccountSearch',
          payload: payload.queryParams,
        });
      }
    },

    *classTypeSearch(_, { call, put }) {
      const data = yield call(queryClassTypeSearch);
      yield put({
        type: 'save',
        payload: {
          classTypeList: get(data, 'payload.items'),
        },
      });
    },

    *classesSearch(_, { call, put }) {
      const data = yield call(queryClassesSearch);
      yield put({
        type: 'save',
        payload: {
          classesList: get(data, 'payload.items'),
        },
      });
    },

    *eventSearch(_, { call, put }) {
      const data = yield call(queryEventSearch);
      yield put({
        type: 'save',
        payload: {
          eventList: get(data, 'payload.items'),
        },
      });
    },

    *styleSearch(_, { call, put }) {
      const data = yield call(queryStyleSearch);
      yield put({
        type: 'save',
        payload: {
          styleList: get(data, 'payload.items'),
        },
      });
    },

    *reset(_, { put }) {
      yield put({ type: 'save', payload: initialState });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default StudentAccountModel;
