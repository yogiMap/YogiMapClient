import React from 'react';
import { connect } from 'umi';
import { Button } from 'antd';
import { ISidepanel } from '@/pages/utils/sidepanel/types';

interface IProps {
  open: (arg: ISidepanel) => void;
}

const TeacherAccountDashboardControls = (props: IProps) => {
  const teacherAccountCreate = () => {
    props.open({
      title: 'Create new Teacher Account',
      component: 'TeacherAccountFormCreate',
      place: 'TeacherAccountDashboard',
      width: '80%',
    });
  };

  return (
    <Button type="primary" shape="round" onClick={teacherAccountCreate}>
      Create Teacher Account
    </Button>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
});

export default connect(null, mapDispatchToProps)(TeacherAccountDashboardControls);
