import { Effect, history, Reducer } from 'umi';

import { queryTeacherTypeCreate, queryTeacherTypeGetById, queryTeacherTypeUpdateById } from '@/pages/teacherType/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface TeacherTypeModelType {
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

const TeacherTypeModel: TeacherTypeModelType = {
  namespace: 'TeacherTypeForm',

  state: initialState,

  effects: {
    *create({ payload }, { call, put }) {
      yield call(queryTeacherTypeCreate, payload);
      yield put({ type: 'TeacherTypeDashboard/teacherTypeSearch' });
      yield put({ type: 'Sidepanel/close' });
      history.push('/teacherType');
    },

    *getById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { teacherTypeInfo: {} } });
      const data = yield call(queryTeacherTypeGetById, payload);
      yield put({ type: 'save', payload: { teacherTypeInfo: data.payload } });
    },

    *updateById({ payload }, { call, put }) {
      yield call(queryTeacherTypeUpdateById, payload);
      yield put({ type: 'Sidepanel/close' });
      yield put({ type: 'TeacherTypeDashboard/teacherTypeSearch', payload: payload.queryParams });
    },

    *reset(_, { put }) {
      yield put({ type: 'save', payload: initialState });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default TeacherTypeModel;
