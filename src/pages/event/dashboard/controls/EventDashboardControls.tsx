import React from 'react';
import { connect } from 'umi';
import { Button } from 'antd';
import { ISidepanel } from '@/pages/utils/sidepanel/types';

interface IProps {
  open: (arg: ISidepanel) => void;
}

const eventDashboardControls = (props: IProps) => {
  const eventCreate = () => {
    props.open({
      title: 'Create new event',
      component: 'eventFormCreate',
      place: 'eventDashboard',
      width: 800,
    });
  };

  return (
    <Button type="primary" onClick={eventCreate}>
      Create event
    </Button>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
});

export default connect(null, mapDispatchToProps)(eventDashboardControls);
