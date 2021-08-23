import React from 'react';
import { connect } from 'umi';
import { get } from 'lodash';
import { ILoadingEffects } from '@/types';
import StudentAccountFormSettingsEditWrapper from '@/pages/user/settings/studentAccount/StudentAccountFormSettingsEditWrapper';
import StudentAccountFormCreateWrapper from '@/pages/user/settings/studentAccount/StudentAccountFormCreateWrapper';
import { IUser } from '@/pages/user/userSearch/types';

interface IProps {
  User: IUser;
  loadingEffects: ILoadingEffects;
}

const StudentAccountSettingsView = (props: IProps) => {
  const hasStudent = get(props, 'User.studentAccount', '');

  // @ts-ignore
  return !hasStudent ? <StudentAccountFormCreateWrapper /> : <StudentAccountFormSettingsEditWrapper />;
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
  User: state.User,
});

export default connect(mapStateToProps)(StudentAccountSettingsView);
