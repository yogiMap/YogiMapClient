import React from 'react';
import { connect } from 'umi';
import { Button } from 'antd';
import { ISidepanel } from '@/pages/utils/sidepanel/types';

interface IProps {
  open: (arg: ISidepanel) => void;
}

const classDashboardControls = (props: IProps) => {
  const classCreate = () => {
    props.open({
      title: 'Create new class',
      component: 'classFormCreate',
      place: 'classDashboard',
      width: 800,
    });
  };

  return (
    <Button type="primary" onClick={classCreate}>
      Create class
    </Button>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
});

export default connect(null, mapDispatchToProps)(classDashboardControls);
