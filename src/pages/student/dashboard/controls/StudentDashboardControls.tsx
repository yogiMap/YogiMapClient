import React from 'react';
import { connect } from 'umi';
import { Button } from 'antd';
import { ISidepanel } from '@/pages/utils/sidepanel/types';

interface IProps {
  open: (arg: ISidepanel) => void;
}

const StudentDashboardControls = (props: IProps) => {
  const studentCreate = () => {
    props.open({
      title: 'Create new Teacher Account',
      component: 'StudentFormCreate',
      place: 'StudentDashboard',
      width: '80%',
    });
  };

  return (
    <Button type="primary" onClick={studentCreate}>
      Create Teacher Account
    </Button>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
});

export default connect(null, mapDispatchToProps)(StudentDashboardControls);
