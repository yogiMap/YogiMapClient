// @ts-nocheck
import { Component } from 'react';
import { ApplyPluginsType } from 'umi';
import dva from 'dva';
// @ts-ignore
import createLoading from '/Users/irinag/WebstormProjects/yogiMapClient/node_modules/dva-loading/dist/index.esm.js';
import { plugin, history } from '../core/umiExports';
import ModelModel0 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/address/dashboard/model.ts';
import ModelModel1 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/address/form/model.ts';
import ModelModel2 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/address/view/model.ts';
import ModelModel3 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/base/dashboard/model.ts';
import ModelModel4 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/base/form/model.ts';
import ModelModel5 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/base/view/model.ts';
import ModelModel6 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/classes/dashboard/model.ts';
import ModelModel7 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/classes/form/model.ts';
import ModelModel8 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/classes/view/model.ts';
import ModelModel9 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/classType/dashboard/model.ts';
import ModelModel10 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/classType/form/model.ts';
import ModelModel11 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/classType/view/model.ts';
import ModelModel12 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/client/calls/model.ts';
import ModelModel13 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/client/dashboard/model.ts';
import ModelModel14 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/client/form/model.ts';
import ModelModel15 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/client/info/model.ts';
import ModelModel16 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/client/messages/form/model.ts';
import ModelModel17 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/client/messages/model.ts';
import ModelModel18 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/event/dashboard/model.ts';
import ModelModel19 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/event/form/model.ts';
import ModelModel20 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/event/view/model.ts';
import ModelModel21 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/focus/dashboard/model.ts';
import ModelModel22 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/focus/view/model.ts';
import ModelModel23 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/payment/dashboard/model.ts';
import ModelModel24 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/payment/form/model.ts';
import ModelModel25 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/payment/view/model.ts';
import ModelModel26 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/schedule/model.ts';
import ModelModel27 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/studentAccount/dashboard/model.ts';
import ModelModel28 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/studentAccount/form/model.ts';
import ModelModel29 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/studentAccount/view/model.ts';
import ModelModel30 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/studentAccount/wizardStudentAccount/model.ts';
import ModelModel31 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/style/dashboard/model.ts';
import ModelModel32 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/style/form/model.ts';
import ModelModel33 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/style/view/model.ts';
import ModelModel34 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/teacher/dashboard/model.ts';
import ModelModel35 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/teacher/form/model.ts';
import ModelModel36 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/teacher/view/model.ts';
import ModelModel37 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/teacherAccount/dashboard/model.ts';
import ModelModel38 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/teacherAccount/form/model.ts';
import ModelModel39 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/teacherAccount/telephony/model.ts';
import ModelModel40 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/teacherAccount/view/model.ts';
import ModelModel41 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/teacherAccount/wizard/model.ts';
import ModelModel42 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/telephony/dashboard/model.ts';
import ModelModel43 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/telephony/view/model.ts';
import ModelModel44 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/telephony/widget/model.ts';
import ModelModel45 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/user/account/model.ts';
import ModelModel46 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/user/profile/model.ts';
import ModelModel47 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/user/settings/model.ts';
import ModelModel48 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/user/userSearch/model.ts';
import ModelModel49 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/utils/hoverCard/model.ts';
import ModelModel50 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/utils/mobileMenu/model.ts';
import ModelModel51 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/utils/searchInput/model.ts';
import ModelModel52 from '/Users/irinag/WebstormProjects/yogiMapClient/src/pages/utils/sidepanel/model.ts';

let app:any = null;

export function _onCreate(options = {}) {
  const runtimeDva = plugin.applyPlugins({
    key: 'dva',
    type: ApplyPluginsType.modify,
    initialValue: {},
  });
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    // @ts-ignore
    ...(typeof window !== 'undefined' && window.g_useSSR ? { initialState: window.g_initialProps } : {}),
    ...(options || {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach((plugin:any) => {
    app.use(plugin);
  });
  app.model({ namespace: 'model', ...ModelModel0 });
app.model({ namespace: 'model', ...ModelModel1 });
app.model({ namespace: 'model', ...ModelModel2 });
app.model({ namespace: 'model', ...ModelModel3 });
app.model({ namespace: 'model', ...ModelModel4 });
app.model({ namespace: 'model', ...ModelModel5 });
app.model({ namespace: 'model', ...ModelModel6 });
app.model({ namespace: 'model', ...ModelModel7 });
app.model({ namespace: 'model', ...ModelModel8 });
app.model({ namespace: 'model', ...ModelModel9 });
app.model({ namespace: 'model', ...ModelModel10 });
app.model({ namespace: 'model', ...ModelModel11 });
app.model({ namespace: 'model', ...ModelModel12 });
app.model({ namespace: 'model', ...ModelModel13 });
app.model({ namespace: 'model', ...ModelModel14 });
app.model({ namespace: 'model', ...ModelModel15 });
app.model({ namespace: 'model', ...ModelModel16 });
app.model({ namespace: 'model', ...ModelModel17 });
app.model({ namespace: 'model', ...ModelModel18 });
app.model({ namespace: 'model', ...ModelModel19 });
app.model({ namespace: 'model', ...ModelModel20 });
app.model({ namespace: 'model', ...ModelModel21 });
app.model({ namespace: 'model', ...ModelModel22 });
app.model({ namespace: 'model', ...ModelModel23 });
app.model({ namespace: 'model', ...ModelModel24 });
app.model({ namespace: 'model', ...ModelModel25 });
app.model({ namespace: 'model', ...ModelModel26 });
app.model({ namespace: 'model', ...ModelModel27 });
app.model({ namespace: 'model', ...ModelModel28 });
app.model({ namespace: 'model', ...ModelModel29 });
app.model({ namespace: 'model', ...ModelModel30 });
app.model({ namespace: 'model', ...ModelModel31 });
app.model({ namespace: 'model', ...ModelModel32 });
app.model({ namespace: 'model', ...ModelModel33 });
app.model({ namespace: 'model', ...ModelModel34 });
app.model({ namespace: 'model', ...ModelModel35 });
app.model({ namespace: 'model', ...ModelModel36 });
app.model({ namespace: 'model', ...ModelModel37 });
app.model({ namespace: 'model', ...ModelModel38 });
app.model({ namespace: 'model', ...ModelModel39 });
app.model({ namespace: 'model', ...ModelModel40 });
app.model({ namespace: 'model', ...ModelModel41 });
app.model({ namespace: 'model', ...ModelModel42 });
app.model({ namespace: 'model', ...ModelModel43 });
app.model({ namespace: 'model', ...ModelModel44 });
app.model({ namespace: 'model', ...ModelModel45 });
app.model({ namespace: 'model', ...ModelModel46 });
app.model({ namespace: 'model', ...ModelModel47 });
app.model({ namespace: 'model', ...ModelModel48 });
app.model({ namespace: 'model', ...ModelModel49 });
app.model({ namespace: 'model', ...ModelModel50 });
app.model({ namespace: 'model', ...ModelModel51 });
app.model({ namespace: 'model', ...ModelModel52 });
  return app;
}

export function getApp() {
  return app;
}

/**
 * whether browser env
 * 
 * @returns boolean
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined'
}

export class _DvaContainer extends Component {
  constructor(props: any) {
    super(props);
    // run only in client, avoid override server _onCreate()
    if (isBrowser()) {
      _onCreate()
    }
  }

  componentWillUnmount() {
    let app = getApp();
    app._models.forEach((model:any) => {
      app.unmodel(model.namespace);
    });
    app._models = [];
    try {
      // 释放 app，for gc
      // immer 场景 app 是 read-only 的，这里 try catch 一下
      app = null;
    } catch(e) {
      console.error(e);
    }
  }

  render() {
    let app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
