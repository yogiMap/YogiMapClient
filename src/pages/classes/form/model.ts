import { Effect, history, Reducer } from 'umi';

import { queryClassesCreate, queryClassesGetById, queryClassesUpdateById } from '@/pages/classes/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface ClassesModelType {
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

const ClassesModel: ClassesModelType = {
  namespace: 'ClassesForm',

  state: initialState,

  effects: {
    *create({ payload }, { call, put }) {
      yield call(queryClassesCreate, payload);
      yield put({ type: 'ClassesDashboard/classesSearch' });
      yield put({ type: 'Sidepanel/close' });
      history.push('/classes');
    },

    *getById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { classesInfo: {} } });
      const data = yield call(queryClassesGetById, payload);
      yield put({ type: 'save', payload: { classesInfo: data.payload } });
    },

    *updateById({ payload }, { call, put }) {
      yield call(queryClassesUpdateById, payload);
      yield put({ type: 'Sidepanel/close' });
      yield put({ type: 'ClassesDashboard/classesSearch', payload: payload.queryParams });
    },

    *reset(_, { put }) {
      yield put({ type: 'save', payload: initialState });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default ClassesModel;
