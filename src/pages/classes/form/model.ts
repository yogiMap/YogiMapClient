import { Effect, history, Reducer } from 'umi';

import { queryClassesCreate, queryClassesGetById, queryClassesUpdateById } from '@/pages/classes/queries';
import defaultReducers from '@/utils/defaultReducers';
import { queryStyleSearch } from '@/pages/style/queries';
import { queryTeacherAccountGetById } from '@/pages/teacherAccount/queries';
import { get } from 'lodash';
import { queryClassTypeSearch } from '@/pages/classType/queries';

export interface IState {}

export interface ClassesModelType {
  namespace: string;
  state: IState;
  effects: {
    create: Effect;
    getById: Effect;
    updateById: Effect;
    styleSearch: Effect;
    // teacherAccountSearch: Effect;
    teacherAccountGetById: Effect;
    classTypeSearch: Effect;
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

    *styleSearch(_, { call, put }) {
      const data = yield call(queryStyleSearch);
      yield put({
        type: 'save',
        payload: {
          styleList: get(data, 'payload.items'),
        },
      });
    },

    // *teacherAccountSearch(_, { call, put }) {
    //   const data = yield call(queryTeacherAccountSearch);
    //   yield put({
    //     type: 'save',
    //     payload: {
    //       teacherAccountList: get(data, 'payload.items'),
    //     },
    //   });
    // },

    *teacherAccountGetById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { teacherAccountInfo: {} } });
      const data = yield call(queryTeacherAccountGetById, payload);
      yield put({
        type: 'save',
        payload: { teacherAccountInfo: data.payload },
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

    *reset(_, { put }) {
      yield put({ type: 'save', payload: initialState });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default ClassesModel;
