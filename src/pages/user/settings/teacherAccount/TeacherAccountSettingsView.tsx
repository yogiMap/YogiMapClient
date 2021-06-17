import React from 'react';
import { connect } from 'umi';
import { get } from 'lodash';
import TeacherAccountFormSettingsEditWrapper from '@/pages/user/settings/teacherAccount/TeacherAccountFormSettingsEditWrapper';
import TeacherAccountFormCreateWrapper from '@/pages/user/settings/teacherAccount/TeacherAccountFormCreateWrapper';
import { ILoadingEffects } from '@/types';
import { IUserAccount } from '@/pages/user/userSearch/types';

interface IProps {
  Account: IUserAccount;
  loadingEffects: ILoadingEffects;
}

const TeacherAccountSettingsView = (props: IProps) => {
  const hasTeacher = get(props, 'Account.teacherAccount', '');

  return !hasTeacher ? <TeacherAccountFormCreateWrapper /> : <TeacherAccountFormSettingsEditWrapper />;
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
  Account: state.Account,
});

export default connect(mapStateToProps)(TeacherAccountSettingsView);
