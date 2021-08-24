import { Effect, Reducer } from 'umi';
import { get } from 'lodash';

import { queryBaseDeleteById, queryBaseGetStats, queryBaseSearch } from '@/pages/base/queries';
import { IBase, IBaseStats } from '@/pages/base/types';
import { IPager } from '@/pages/utils/pager/types';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {
  baseList?: IBase[];
  baseStats?: IBaseStats;
  basePager?: IPager;
}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    [key: string]: Effect;
  };
  reducers: {
    save: Reducer<IState>;
    set: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'HomeBoard',

  state: {},

  effects: {
    *reset(_, { put }) {
      yield put({ type: 'set', payload: {} });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
