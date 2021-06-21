import React from 'react';
import { connect } from 'umi';
import { Button } from 'antd';
import { ISidepanel } from '@/pages/utils/sidepanel/types';

interface IProps {
  open: (arg: ISidepanel) => void;
}

const StudentAccountDashboardControls = (props: IProps) => {
  const studentAccountCreate = () => {
    props.open({
      title: 'Create StudentAccount Account',
      component: 'StudentAccountFormCreate',
      place: 'StudentAccountDashboard',
      width: '80%',
    });
  };

  return (
    <Button type="primary" onClick={studentAccountCreate}>
      Create Teacher Account
    </Button>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
});

export default connect(null, mapDispatchToProps)(StudentAccountDashboardControls);
