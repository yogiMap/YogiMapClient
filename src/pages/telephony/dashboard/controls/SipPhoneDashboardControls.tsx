import React from 'react';
import { connect } from 'umi';
import { Button } from 'antd';
import { ISidepanel } from '@/pages/utils/sidepanel/types';

interface IProps {
  open: (arg: ISidepanel) => void;
}

const SipPhoneDashboardControls = (props: IProps) => {
  const sipPhoneCreate = () => {
    props.open({
      title: 'Create new SipPhone',
      component: 'SipPhoneFormCreate',
      place: 'SipPhoneDashboard',
      width: 800,
    });
  };

  return (
    <Button type="primary" onClick={sipPhoneCreate}>
      Create SipPhone
    </Button>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
});

export default connect(null, mapDispatchToProps)(SipPhoneDashboardControls);
