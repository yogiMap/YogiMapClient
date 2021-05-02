import React from 'react';
import { connect } from 'umi';
import { ICompanyAccount } from '@/pages/companyAccount/types';
import { get } from 'lodash';

import CompanyAccountFormSettingsEditWrapper from '@/pages/user/settings/companyAccount/CompanyAccountFormSettingsEditWrapper';
import CompanyAccountFormCreateWrapper from '@/pages/user/settings/companyAccount/CompanyAccountFormCreateWrapper';
import { ILoadingEffects } from '@/types';

interface IProps {
  create: (arg: ICompanyAccount) => void;
  loadingEffects: ILoadingEffects;

  companyAccountGetById: (companyAccountId: string) => void;
  getById: (companyAccountId: string) => void;
  updateById: (payload: ICompanyAccount) => void;
}

const CompanyAccountSettingsView = (props: IProps) => {
  const hasTeacher = get(props, 'Account.companyAccount', '');

  return !hasTeacher ? <CompanyAccountFormCreateWrapper /> : <CompanyAccountFormSettingsEditWrapper />;
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
  Account: state.Account,
});

const mapDispatchToProps = (dispatch: any) => ({
  create: (payload: ICompanyAccount) => dispatch({ type: 'CompanyAccountForm/create', payload }),
  getById: (companyAccountId: string) => dispatch({ type: 'CompanyAccountForm/getById', payload: companyAccountId }),
  updateById: (payload: ICompanyAccount) => dispatch({ type: 'CompanyAccountForm/updateById', payload }),

  companyAccountGetById: (companyAccountId: string) =>
    dispatch({ type: 'CompanyAccountView/companyAccountGetById', payload: companyAccountId }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyAccountSettingsView);
