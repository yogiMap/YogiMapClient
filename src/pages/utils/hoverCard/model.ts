import { Effect, Reducer } from 'umi';
import defaultReducers from '@/utils/defaultReducers';
import { queryUserGetById } from '@/pages/user/queries';
// import { queryClientGetInfoById } from '@/pages/client/queries';

export interface IState {}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    userGetById: Effect;
 //   clientGetById: Effect;
    close: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'HoverCard',

  state: {},

  effects: {
    *userGetById({ payload }, { call, put }) {
      const response = yield call(queryUserGetById, payload);
      yield put({
        type: 'save',
        payload: response.payload,
      });
    },

    // *clientGetById({ payload }, { call, put }) {
    //   const response = yield call(queryClientGetInfoById, payload);
    //   yield put({
    //     type: 'save',
    //     payload: response.payload,
    //   });
    // },

    *close(_, { put }) {
      yield put({ type: 'set', payload: {} });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
