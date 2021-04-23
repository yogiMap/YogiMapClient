import { Effect, history, Reducer } from 'umi';

import { queryClassCreate, queryClassGetById, queryClassUpdateById } from '@/pages/class/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface ClassModelType {
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

const ClassModel: ClassModelType = {
  namespace: 'ClassForm',

  state: initialState,

  effects: {
    *create({ payload }, { call, put }) {
      yield call(queryClassCreate, payload);
      yield put({ type: 'ClassDashboard/classSearch' });
      yield put({ type: 'Sidepanel/close' });
      history.push('/class');
    },

    *getById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { classInfo: {} } });
      const data = yield call(queryClassGetById, payload);
      yield put({ type: 'save', payload: { classInfo: data.payload } });
    },

    *updateById({ payload }, { call, put }) {
      yield call(queryClassUpdateById, payload);
      yield put({ type: 'Sidepanel/close' });
      yield put({ type: 'ClassDashboard/classSearch', payload: payload.queryParams });
    },

    *reset(_, { put }) {
      yield put({ type: 'save', payload: initialState });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default ClassModel;
