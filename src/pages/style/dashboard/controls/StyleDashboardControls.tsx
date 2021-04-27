import React from 'react';
import { connect } from 'umi';
import { Button } from 'antd';
import { ISidepanel } from '@/pages/utils/sidepanel/types';

interface IProps {
  open: (arg: ISidepanel) => void;
}

const StyleDashboardControls = (props: IProps) => {
  const styleCreate = () => {
    props.open({
      title: 'Create new Style',
      component: 'StyleFormCreate',
      place: 'StyleDashboard',
      width: 800,
    });
  };

  return (
    <Button type="primary"  shape="round" onClick={styleCreate}>
      Create Style
    </Button>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
});

export default connect(null, mapDispatchToProps)(StyleDashboardControls);
