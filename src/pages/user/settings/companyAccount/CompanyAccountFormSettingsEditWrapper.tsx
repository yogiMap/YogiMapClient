import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { ICompanyAccount, ICompanyAccountQueryParams } from '@/pages/companyAccount/types';
import CompanyAccountForm from '@/pages/companyAccount/form/CompanyAccountForm';
import { ILoadingEffects } from '@/types';

export interface ICompanyAccountUpdate {
  values: ICompanyAccount;
  companyAccountId: string;
  queryParams: ICompanyAccountQueryParams;
}

interface IProps {
  getById: (companyAccountId: string) => void;
  updateById: (arg: any) => void;
  companyAccountGetById: (companyAccountId: string) => void;
  companyAccountInfo: ICompanyAccount;
  loadingEffects: ILoadingEffects;
}

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const CompanyAccountFormSettingsEditWrapper = (props: IProps) => {
  const companyAccountId = get(props, 'CompanyAccountId');
  const queryParams = get(props, 'location.query', {});
  const isLoadingGet = get(props, 'loadingEffects.CompanyAccountForm/getById', false);
  const isLoadingUpdate = get(props, 'loadingEffects.CompanyAccountForm/updateById', false);

  useEffect(() => {
    props.companyAccountGetById(companyAccountId);
    props.getById(companyAccountId);
  }, []);

  const onFinish = (values: ICompanyAccount) => {
    props.updateById({ values, companyAccountId, queryParams });
  };

  if (isLoadingGet) return <Spin indicator={antIcon} />;

  return (
    <CompanyAccountForm
      onFinish={onFinish}
      initialValues={props.companyAccountInfo}
      submitButtonText="Update"
      isLoading={isLoadingUpdate}
    />
  );
};

const mapStateToProps = (state: any) => ({
  CompanyAccountView: state.CompanyAccountView,
  CompanyAccountId: state.Account.companyAccount,
  companyAccountInfo: state.CompanyAccountForm.companyAccountInfo,
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  companyAccountGetById: (companyAccountId: string) =>
    dispatch({ type: 'CompanyAccountView/companyAccountGetById', payload: companyAccountId }),
  getById: (companyAccountId: string) => dispatch({ type: 'CompanyAccountForm/getById', payload: companyAccountId }),
  updateById: (payload: ICompanyAccountUpdate) => dispatch({ type: 'CompanyAccountForm/updateById', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyAccountFormSettingsEditWrapper);
