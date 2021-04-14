import { Effect, history, Reducer } from 'umi';

import { queryTeacherCreate, queryTeacherGetById, queryTeacherUpdateById } from '@/pages/teacher/queries';
import defaultReducers from '@/utils/defaultReducers';
import { queryTeacherTypeSearch } from '@/pages/teacherType/queries';
import { get } from 'lodash';

export interface IState {}

export interface TeacherModelType {
  namespace: string;
  state: IState;
  effects: {
    create: Effect;
    getById: Effect;
    updateById: Effect;
    teacherTypeSearch: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
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

    *teacherTypeSearch(_, { call, put }) {
      const data = yield call(queryTeacherTypeSearch);
      yield put({
        type: 'save',
        payload: {
          teacherTypeList: get(data, 'payload.items'),
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

export default TeacherModel;
