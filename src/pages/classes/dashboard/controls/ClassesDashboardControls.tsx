import React from 'react';
import { connect } from 'umi';
import { Button } from 'antd';
import { ISidepanel } from '@/pages/utils/sidepanel/types';

interface IProps {
  open: (arg: ISidepanel) => void;
}

const ClassesDashboardControls = (props: IProps) => {
  const classesCreate = () => {
    props.open({
      title: 'Create new Classes',
      component: 'ClassesFormCreate',
      place: 'ClassesDashboard',
      width: 800,
    });
  };

  return (
    <Button type="primary" onClick={classesCreate}>
      Create Classes
    </Button>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
});

export default connect(null, mapDispatchToProps)(ClassesDashboardControls);
