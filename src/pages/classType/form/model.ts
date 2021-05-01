import { Effect, history, Reducer } from 'umi';

import { queryClassTypeCreate, queryClassTypeGetById, queryClassTypeUpdateById } from '@/pages/classType/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface ClassTypeModelType {
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

const ClassTypeModel: ClassTypeModelType = {
  namespace: 'ClassTypeForm',

  state: initialState,

  effects: {
    *create({ payload }, { call, put }) {
      yield call(queryClassTypeCreate, payload);
      yield put({ type: 'ClassTypeDashboard/classTypeSearch' });
      yield put({ type: 'Sidepanel/close' });
      history.push('/classType');
    },

    *getById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { classTypeInfo: {} } });
      const data = yield call(queryClassTypeGetById, payload);
      yield put({ type: 'save', payload: { classTypeInfo: data.payload } });
    },

    *updateById({ payload }, { call, put }) {
      yield call(queryClassTypeUpdateById, payload);
      yield put({ type: 'Sidepanel/close' });
      yield put({ type: 'ClassTypeDashboard/classTypeSearch', payload: payload.queryParams });
    },

    *reset(_, { put }) {
      yield put({ type: 'save', payload: initialState });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default ClassTypeModel;
