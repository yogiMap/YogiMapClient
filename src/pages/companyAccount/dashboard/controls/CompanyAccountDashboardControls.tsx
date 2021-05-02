import React from 'react';
import { connect } from 'umi';
import { Button } from 'antd';
import { ISidepanel } from '@/pages/utils/sidepanel/types';

interface IProps {
  open: (arg: ISidepanel) => void;
}

const CompanyAccountDashboardControls = (props: IProps) => {
  const companyAccountCreate = () => {
    props.open({
      title: 'Create new Teacher Account',
      component: 'CompanyAccountFormCreate',
      place: 'CompanyAccountDashboard',
      width: 1000,
    });
  };

  return (
    <Button type="primary" onClick={companyAccountCreate}>
      Create Teacher Account
    </Button>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
});

export default connect(null, mapDispatchToProps)(CompanyAccountDashboardControls);
