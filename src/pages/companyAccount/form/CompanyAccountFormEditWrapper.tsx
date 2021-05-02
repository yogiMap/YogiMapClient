import React, { useEffect } from 'react';
import { connect, withRouter } from 'umi';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { get } from 'lodash';
import CompanyAccountForm from '@/pages/companyAccount/form/CompanyAccountForm';
import { ICompanyAccount } from '@/pages/companyAccount/types';
import { ILoadingEffects } from '@/types';

interface IProps {
  getById: (companyAccountId: string) => void;
  reset: () => void;
  updateById: any;
  companyAccountInfo: ICompanyAccount;
  loadingEffects: ILoadingEffects;
}
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const CompanyAccountFormEditWrapper = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});

  const companyAccountId: string = get(props, 'Sidepanel.companyAccountId', '');

  const isLoadingGet = get(props, 'loadingEffects.CompanyAccountForm/getById', false);
  const isLoadingUpdate = get(props, 'loadingEffects.CompanyAccountForm/updateById', false);

  useEffect(() => {
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
  Sidepanel: state.Sidepanel,
  companyAccountInfo: state.CompanyAccountForm.companyAccountInfo,
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  reset: () => dispatch({ type: 'CompanyAccountForm/reset' }),
  updateById: (payload: ICompanyAccount) => dispatch({ type: 'CompanyAccountForm/updateById', payload }),
  getById: (companyAccountId: string) => dispatch({ type: 'CompanyAccountForm/getById', payload: companyAccountId }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CompanyAccountFormEditWrapper));
