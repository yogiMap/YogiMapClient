import { Effect, history, Reducer } from 'umi';

import { queryClientCreate, queryClientGetInfoById, queryClientUpdateById } from '@/pages/client/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface ClientModelType {
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

const ClientModel: ClientModelType = {
  namespace: 'ClientForm',

  state: initialState,

  effects: {
    *create({ payload }, { call, put }) {
      const createResult = yield call(queryClientCreate, payload);
      if (!(createResult instanceof Error)) {
        yield put({ type: 'ClientDashboard/search' });
        yield put({ type: 'ClientDashboard/getStats' });
        yield put({ type: 'Sidepanel/close' });
        history.push('/client');
      }
    },

    *getById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { clientInfo: {} } });
      const data = yield call(queryClientGetInfoById, payload);
      yield put({ type: 'save', payload: { clientInfo: data.payload } });
    },

    *updateById({ payload }, { call, put }) {
      const updateResult = yield call(queryClientUpdateById, payload);
      if (!(updateResult instanceof Error)) {
        yield put({ type: 'Sidepanel/close' });
        yield put({
          type: 'ClientDashboard/search',
          payload: payload.queryParams,
        });
        yield put({
          type: 'ClientInfo/getInfoById',
          payload: payload.clientId,
        });
      }
    },

    *reset(_, { put }) {
      yield put({ type: 'save', payload: initialState });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default ClientModel;
