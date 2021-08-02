import { Effect, history, Reducer } from 'umi';

import { queryTeacherCreate, queryTeacherGetById, queryTeacherUpdateById } from '@/pages/teacher/queries';
import defaultReducers from '@/utils/defaultReducers';
import { queryClassTypeSearch } from '@/pages/classType/queries';
import { queryClassesSearch } from '@/pages/classes/queries';
import { queryEventSearch } from '@/pages/event/queries';
import { queryStyleSearch } from '@/pages/style/queries';
import { get } from 'lodash';
import { ITeacherAccount } from '@/pages/teacherAccount/types';

export interface IState {}

export interface TeacherModelType {
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
    set: Reducer<ITeacherAccount>;
  };
}

const initialState = {};

const TeacherModel: TeacherModelType = {
  namespace: 'TeacherForm',

  state: initialState,

  effects: {
    *create({ payload }, { call, put }) {
      yield call(queryTeacherCreate, payload);
      yield put({ type: 'TeacherDashboard/teacherSearch' });
      yield put({ type: 'Sidepanel/close' });
      history.push('/teacher');
    },

    *getById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { teacherInfo: {} } });
      const data = yield call(queryTeacherGetById, payload);
      yield put({ type: 'save', payload: { teacherInfo: data.payload } });
    },

    *updateById({ payload }, { call, put }) {
      yield call(queryTeacherUpdateById, payload);
      yield put({ type: 'Sidepanel/close' });
      yield put({ type: 'TeacherDashboard/teacherSearch', payload: payload.queryParams });
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
      yield put({ type: 'set', payload: initialState });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default TeacherModel;
