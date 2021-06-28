import React from 'react';
import { connect } from 'umi';
import { Button } from 'antd';
import { ISidepanel } from '@/pages/utils/sidepanel/types';

interface IProps {
  open: (arg: ISidepanel) => void;
}

const SidPhoneDashboardControls = (props: IProps) => {
  const sidPhoneCreate = () => {
    props.open({
      title: 'Create new SidPhone',
      component: 'SidPhoneFormCreate',
      place: 'SidPhoneDashboard',
      width: 800,
    });
  };

  return (
    <Button type="primary" onClick={sidPhoneCreate}>
      Create SidPhone
    </Button>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
});

export default connect(null, mapDispatchToProps)(SidPhoneDashboardControls);
