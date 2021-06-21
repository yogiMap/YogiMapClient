import React from 'react';
import { connect } from 'umi';
import { get } from 'lodash';
import { ILoadingEffects } from '@/types';
import StudentAccountFormSettingsEditWrapper from '@/pages/user/settings/studentAccount/StudentAccountFormSettingsEditWrapper';
import StudentAccountFormCreateWrapper from '@/pages/user/settings/studentAccount/StudentAccountFormCreateWrapper';
import { IUserAccount } from '@/pages/user/userSearch/types';

interface IProps {
  Account: IUserAccount;
  loadingEffects: ILoadingEffects;
}

const StudentAccountSettingsView = (props: IProps) => {
  const hasStudent = get(props, 'Account.studentAccount', '');

  // @ts-ignore
  return !hasStudent ? <StudentAccountFormCreateWrapper /> : <StudentAccountFormSettingsEditWrapper />;
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
  Account: state.Account,
});

export default connect(mapStateToProps)(StudentAccountSettingsView);
