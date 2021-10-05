// @ts-nocheck
import { IRoute } from '@umijs/core';
import { AnyAction } from 'redux';
import React from 'react';
import { EffectsCommandMap, SubscriptionAPI } from 'dva';
import { match } from 'react-router-dom';
import { Location, LocationState, History } from 'history';

export * from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/address/dashboard/model';
export * from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/address/form/model';
export * from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/address/view/model';
export * from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/base/dashboard/model';
export * from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/base/form/model';
export * from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/base/view/model';
export * from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/classes/dashboard/model';
export * from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/classes/form/model';
export * from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/classes/view/model';
export * from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/classType/dashboard/model';
export * from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/classType/form/model';
export * from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/classType/view/model';
export * from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/client/calls/model';
export * from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/client/dashboard/model';
export * from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/client/form/model';
export * from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/client/info/model';
export * from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/client/messages/form/model';
export * from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/client/messages/model';
export * from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/email/model';
export * from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/event/dashboard/model';
export * from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/event/form/model';
export * from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/event/view/model';
export * from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/focus/dashboard/model';
export * from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/focus/view/model';
export * from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/homeboard/model';
export * from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/payment/dashboard/model';
export * from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/payment/form/model';
export * from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/payment/view/model';
export * from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/schedule/model';
export * from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/studentAccount/dashboard/model';
export * from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/studentAccount/form/model';
export * from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/studentAccount/view/model';
export * from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/studentAccount/wizardStudentAccount/model';
export * from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/style/dashboard/model';
export * from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/style/form/model';
export * from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/style/view/model';
export * from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/teacher/dashboard/model';
export * from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/teacher/form/model';
export * from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/teacher/view/model';
export * from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/teacherAccount/model';
export * from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/telephony/dashboard/model';
export * from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/telephony/view/model';
export * from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/telephony/widget/model';
export * from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/user/model';
export * from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/utils/hoverCard/model';
export * from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/utils/mobileMenu/model';
export * from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/utils/searchInput/model';
export * from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/utils/sidepanel/model';

export interface Action<T = any> {
  type: T
}

export type Reducer<S = any, A extends Action = AnyAction> = (
  state: S | undefined,
  action: A
) => S;

export type ImmerReducer<S = any, A extends Action = AnyAction> = (
  state: S,
  action: A
) => void;

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap,
) => void;

/**
 * @type P: Type of payload
 * @type C: Type of callback
 */
export type Dispatch<P = any, C = (payload: P) => void> = (action: {
  type: string;
  payload?: P;
  callback?: C;
  [key: string]: any;
}) => any;

export type Subscription = (api: SubscriptionAPI, done: Function) => void | Function;

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    [key: string]: any;
  };
}

/**
 * @type P: Params matched in dynamic routing
 */
export interface ConnectProps<
  P extends { [K in keyof P]?: string } = {},
  S = LocationState,
  T = {}
> {
  dispatch?: Dispatch;
  // https://github.com/umijs/umi/pull/2194
  match?: match<P>;
  location: Location<S> & { query: T };
  history: History;
  route: IRoute;
}

export type RequiredConnectProps<
  P extends { [K in keyof P]?: string } = {},
  S = LocationState,
  T = {}
  > = Required<ConnectProps<P, S, T>>

/**
 * @type T: React props
 * @type U: match props types
 */
export type ConnectRC<
  T = {},
  U = {},
  S = {},
  Q = {}
> = React.ForwardRefRenderFunction<any, T & RequiredConnectProps<U, S, Q>>;

