import React from 'react';
import { connect } from 'umi';
import CompanyAccountForm from '@/pages/companyAccount/form/CompanyAccountForm';
import { ICompanyAccount } from '@/pages/companyAccount/types';
import { get } from 'lodash';
import { ILoadingEffects } from '@/types';

interface IProps {
  create: (arg: ICompanyAccount) => void;
  loadingEffects: ILoadingEffects;
}

const CompanyAccountFormCreateWrapper = (props: IProps) => {
  const onFinish = (values: ICompanyAccount) => {
    props.create(values);
  };

  const isLoading = get(props, 'loadingEffects.CompanyAccountForm/create', false);

  return <CompanyAccountForm onFinish={onFinish} submitButtonText="Create Teacher Account" isLoading={isLoading} />;
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  create: (payload: ICompanyAccount) => dispatch({ type: 'CompanyAccountForm/create', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyAccountFormCreateWrapper);
