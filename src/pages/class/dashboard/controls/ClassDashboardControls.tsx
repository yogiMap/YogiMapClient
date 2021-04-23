import React from 'react';
import { connect } from 'umi';
import { Button } from 'antd';
import { ISidepanel } from '@/pages/utils/sidepanel/types';

interface IProps {
  open: (arg: ISidepanel) => void;
}

const ClassDashboardControls = (props: IProps) => {
  const classCreate = () => {
    props.open({
      title: 'Create new Class',
      component: 'ClassFormCreate',
      place: 'ClassDashboard',
      width: 800,
    });
  };

  return (
    <Button type="primary" onClick={classCreate}>
      Create Class
    </Button>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
});

export default connect(null, mapDispatchToProps)(ClassDashboardControls);
