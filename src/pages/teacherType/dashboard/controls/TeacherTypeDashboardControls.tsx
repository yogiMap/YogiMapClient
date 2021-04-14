import React from 'react';
import { connect } from 'umi';
import { Button } from 'antd';
import { ISidepanel } from '@/pages/utils/sidepanel/types';

interface IProps {
  open: (arg: ISidepanel) => void;
}

const TeacherTypeDashboardControls = (props: IProps) => {
  const teacherTypeCreate = () => {
    props.open({
      title: 'What Type of Yoga do you Teach?',
      component: 'TeacherTypeFormCreate',
      place: 'TeacherTypeDashboard',
      width: 800,
    });
  };

  return (
    <Button type="primary" onClick={teacherTypeCreate}>
      What Type of Yoga do you Teach?
    </Button>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
});

export default connect(null, mapDispatchToProps)(TeacherTypeDashboardControls);
