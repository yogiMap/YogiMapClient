import { Effect, history, Reducer } from 'umi';

import { queryclassCreate, queryclassGetById, queryclassUpdateById } from '@/pages/class/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface classModelType {
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

const classModel: classModelType = {
  namespace: 'classForm',

  state: initialState,

  effects: {
    *create({ payload }, { call, put }) {
      yield call(queryclassCreate, payload);
      yield put({ type: 'classDashboard/classSearch' });
      yield put({ type: 'Sidepanel/close' });
      history.push('/class');
    },

    *getById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { classInfo: {} } });
      const data = yield call(queryclassGetById, payload);
      yield put({ type: 'save', payload: { classInfo: data.payload } });
    },

    *updateById({ payload }, { call, put }) {
      yield call(queryclassUpdateById, payload);
      yield put({ type: 'Sidepanel/close' });
      yield put({ type: 'classDashboard/classSearch', payload: payload.queryParams });
    },

    *reset(_, { put }) {
      yield put({ type: 'save', payload: initialState });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default classModel;
