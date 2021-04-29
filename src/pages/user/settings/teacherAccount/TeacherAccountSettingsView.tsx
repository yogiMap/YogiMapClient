import React from 'react';
import { connect } from 'umi';
import { ITeacherAccount } from '@/pages/teacherAccount/types';
import { get } from 'lodash';

import TeacherAccountFormSettingsEditWrapper from '@/pages/user/settings/teacherAccount/TeacherAccountFormSettingsEditWrapper';
import TeacherAccountFormCreateWrapper from '@/pages/user/settings/teacherAccount/TeacherAccountFormCreateWrapper';
import { ILoadingEffects } from '@/types';

interface IProps {
  create: (arg: ITeacherAccount) => void;
  loadingEffects: ILoadingEffects;

  teacherAccountGetById: (teacherAccountId: string) => void;
  getById: (teacherAccountId: string) => void;
  updateById: (payload: ITeacherAccount) => void;
}

const TeacherAccountSettingsView = (props: IProps) => {
  const hasTeacher = get(props, 'Account.teacherAccount', '');

  return !hasTeacher ? <TeacherAccountFormCreateWrapper /> : <TeacherAccountFormSettingsEditWrapper />;
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
  Account: state.Account,
});

const mapDispatchToProps = (dispatch: any) => ({
  create: (payload: ITeacherAccount) => dispatch({ type: 'TeacherAccountForm/create', payload }),
  getById: (teacherAccountId: string) => dispatch({ type: 'TeacherAccountForm/getById', payload: teacherAccountId }),
  updateById: (payload: ITeacherAccount) => dispatch({ type: 'TeacherAccountForm/updateById', payload }),

  teacherAccountGetById: (teacherAccountId: string) =>
    dispatch({ type: 'TeacherAccountView/teacherAccountGetById', payload: teacherAccountId }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherAccountSettingsView);
