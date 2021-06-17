import React from 'react';
import { connect } from 'umi';
import { get } from 'lodash';
import { ILoadingEffects } from '@/types';
import StudentFormSettingsEditWrapper from '@/pages/user/settings/studentAccount/StudentFormSettingsEditWrapper';
import StudentFormCreateWrapper from '@/pages/user/settings/studentAccount/StudentFormCreateWrapper';
import { IUserAccount } from '@/pages/user/userSearch/types';

interface IProps {
  Account: IUserAccount;
  loadingEffects: ILoadingEffects;
}

const StudentAccountSettingsView = (props: IProps) => {
  const hasStudent = get(props, 'Account.student', '');

  return !hasStudent ? <StudentFormCreateWrapper /> : <StudentFormSettingsEditWrapper />;
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
  Account: state.Account,
});

export default connect(mapStateToProps)(StudentAccountSettingsView);
