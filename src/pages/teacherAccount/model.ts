import { Effect, Reducer } from 'umi';

import {
  queryTeacherAccountCreate,
  queryTeacherAccountDeleteById,
  queryTeacherAccountGet,
  queryTeacherAccountGetById,
  //queryTeacherAccountEmployee,
  //queryTeacherAccountGetByIdAndInviteHash,
  queryTeacherAccountGetStats,
  queryTeacherAccountSearch,
  queryTeacherAccountSipPhone,
  queryTeacherAccountUpdateById,
  queryTeacherAccountUploadImage,
} from '@/pages/teacherAccount/queries';
import defaultReducers from '@/utils/defaultReducers';
import {
  querySipPhoneAvailablePhoneNumbers,
  querySipPhoneBuyPhoneNumber,
  querySipPhoneCreate,
  querySipPhoneGetById,
  querySipPhoneTollFreePhoneNumbers,
  querySipPhoneUpdateById,
} from '@/pages/telephony/queries';
import { get } from 'lodash';
import { queryUserUpdateSelf } from '@/pages/user/queries';
import { queryUserVerifyEmailSend } from '@/pages/user/userSearch/queries';
import { queryClassesSearch } from '@/pages/classes/queries';
import { queryEventSearch } from '@/pages/event/queries';
import { queryClassTypeSearch } from '@/pages/classType/queries';
import { queryStyleSearch } from '@/pages/style/queries';

export interface IState {}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    [key: string]: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'TeacherAccount',

  state: {},

  effects: {
    *teacherAccountGetById(_, { call, put }) {
      yield put({ type: 'MobileMenu/close' });
      // if (Cookies.get('user_auth')) {
      yield put({ type: 'save', payload: {} });
      const data = yield call(queryTeacherAccountGet);
      yield put({ type: 'save', payload: { ...data.payload } });
      // }
    },

    *teacherAccountUploadImage({ payload }, { call, put }) {
      yield call(queryTeacherAccountUploadImage, payload);
      yield put({ type: 'teacherAccountGetById', payload: payload.teacherAccountId });
    },

    //TeacherAccount onBoarding
    *teacherAccountCreate({ payload }, { call, put }) {
      yield call(queryTeacherAccountCreate, payload);
      //TODO: Why auth? Do we have any other option? (push doesn't work)
      yield put({ type: 'User/auth' });
      // history.push('/onboarding/business');
    },

    *userStepSubmit({ payload }, { call, put }) {
      yield call(queryUserUpdateSelf, payload);
      yield put({ type: 'User/auth' });
      // history.push('/onboarding/teacher');
    },

    *userVerifyEmailSend({ payload }, { call }) {
      yield call(queryUserVerifyEmailSend, payload);
    },

    //TeacherAccount Form
    *getById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: {} });
      const data = yield call(queryTeacherAccountGetById, payload);
      yield put({
        type: 'save',
        payload: data.payload,
      });
    },

    *updateById({ payload }, { call, put }) {
      const updateResult = yield call(queryTeacherAccountUpdateById, payload);
      if (!(updateResult instanceof Error)) {
        yield put({ type: 'Sidepanel/close' });
        yield put({
          type: 'teacherAccountSearch',
          payload: payload.queryParams,
        });
      }
      yield put({ type: 'getById', payload: payload.teacherAccountId });
    },

    *classesSearch(_, { call, put }) {
      const data = yield call(queryClassesSearch);
      yield put({
        type: 'save',
        payload: {
          classesList: get(data, 'payload.items'),
        },
      });
    },

    *eventSearch(_, { call, put }) {
      const data = yield call(queryEventSearch);
      yield put({
        type: 'save',
        payload: {
          eventList: get(data, 'payload.items'),
        },
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

    *styleSearch(_, { call, put }) {
      const data = yield call(queryStyleSearch);
      yield put({
        type: 'save',
        payload: {
          styleList: get(data, 'payload.items'),
        },
      });
    },

    //TeacherAccount Dashboard
    *teacherAccountSearch({ payload }, { call, put }) {
      yield put({ type: 'MobileMenu/close' });
      const data = yield call(queryTeacherAccountSearch, payload);
      yield put({
        type: 'save',
        payload: {
          teacherAccountList: get(data, 'payload.items'),
          teacherAccountPager: get(data, 'payload.pager'),
        },
      });
    },

    *teacherAccountGetStats(_, { call, put }) {
      const data = yield call(queryTeacherAccountGetStats);
      yield put({
        type: 'save',
        payload: { teacherAccountStats: data.payload },
      });
    },

    *teacherAccountDeleteById({ payload }, { call, put }) {
      yield call(queryTeacherAccountDeleteById, payload.teacherAccountId);
      yield put({ type: 'teacherAccountSearch', payload: payload.queryParams });
    },

    // TeacherAccount Telephony
    *teacherAccountGetSipPhone(_, { call, put }) {
      yield put({ type: 'save', payload: { teacherSipPhone: [] } });
      const data = yield call(queryTeacherAccountSipPhone);
      yield put({ type: 'save', payload: { teacherSipPhone: data.payload } });
    },

    *create({ payload }, { call, put }) {
      yield call(querySipPhoneCreate, payload);
      yield put({ type: 'Sidepanel/close' });
      yield put({ type: 'teacherAccountGetSipPhone', payload: payload.teacherAccount });
    },

    *telephonyGetById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { sipPhoneInfo: {} } });
      const data = yield call(querySipPhoneGetById, payload);
      yield put({ type: 'save', payload: { sipPhoneInfo: data.payload } });
    },

    *TelephonyUpdateById({ payload }, { call, put }) {
      yield call(querySipPhoneUpdateById, payload);
      yield put({ type: 'Sidepanel/close' });
      yield put({ type: 'teacherAccountGetSipPhone', payload: payload.teacherAccountId });
    },

    *availablePhoneNumbers({ payload }, { call, put }) {
      yield put({ type: 'save', payload: {} });
      const data = yield call(querySipPhoneAvailablePhoneNumbers, payload);
      yield put({ type: 'save', payload: { availablePhoneNumbers: data.payload } });
    },

    *tollFreePhoneNumbers({ payload }, { call, put }) {
      yield put({ type: 'save', payload: {} });
      const data = yield call(querySipPhoneTollFreePhoneNumbers, payload);
      yield put({ type: 'save', payload: { tollFreePhoneNumbers: data.payload } });
    },

    *buyPhoneNumber({ payload }, { call, put }) {
      yield put({ type: 'save', payload: {} });
      const data = yield call(querySipPhoneBuyPhoneNumber, payload);
      // yield put({ type: 'save', payload: { availablePhoneNumbers: data.payload } });
    },

    *reset(_, { put }) {
      yield put({ type: 'set', payload: {} });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
