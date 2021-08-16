import { Effect, history, Reducer } from 'umi';

import {
  queryTeacherAccountCreate,
  queryTeacherAccountGetById,
  queryTeacherAccountUpdateById,
} from '@/pages/teacherAccount/queries';
import defaultReducers from '@/utils/defaultReducers';
import { queryClassTypeSearch } from '@/pages/classType/queries';
import { queryClassesSearch } from '@/pages/classes/queries';
import { queryEventSearch } from '@/pages/event/queries';
import { queryStyleSearch } from '@/pages/style/queries';
import { get } from 'lodash';
import { queryUserLogin } from '@/pages/user/queries';
import { ITeacherAccount } from '@/pages/teacherAccount/types';

export interface IState {}

export interface TeacherAccountModelType {
  namespace: string;
  state: IState;
  effects: {
    create: Effect;
    getById: Effect;
    updateById: Effect;
    classesSearch: Effect;
    eventSearch: Effect;
    classTypeSearch: Effect;
    styleSearch: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
    set: Reducer<ITeacherAccount>;
  };
}

const initialState = {};

const TeacherAccountModel: TeacherAccountModelType = {
  namespace: 'TeacherAccountForm',

  state: initialState,

  effects: {
    *create({ payload }, { call, put }) {
      const data = yield call(queryUserLogin, payload);
      const userId = get(data, 'userId', '');

      const createResult = yield call(queryTeacherAccountCreate, payload);

      if (!(createResult instanceof Error)) {
        yield put({ type: 'TeacherAccountDashboard/teacherAccountSearch' });
        yield put({ type: 'Sidepanel/close' });
        yield put({ type: 'Account/auth' });
        history.push(`/settings/teacherAccount/${userId}`);
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
      yield put({ type: 'getById', payload: payload.companyAccountId });
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

    *classTypeSearch(_, { call, put }) {
      const data = yield call(queryClassTypeSearch);
      yield put({
        type: 'save',
        payload: {
          classTypeList: get(data, 'payload.items'),
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
      yield put({ type: 'set', payload: initialState });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default TeacherAccountModel;
