import React from 'react';
import { connect } from 'umi';
import { Button } from 'antd';
import { ISidepanel } from '@/pages/utils/sidepanel/types';

interface IProps {
  open: (arg: ISidepanel) => void;
}

const PaymentDashboardControls = (props: IProps) => {
  const paymentCreate = () => {
    props.open({
      title: 'Create Payment',
      component: 'PaymentFormCreate',
      place: 'PaymentDashboard',
      width: '60%',
    });
  };

  return (
    <Button type="primary" onClick={paymentCreate}>
      Create Payment
    </Button>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
});

export default connect(null, mapDispatchToProps)(PaymentDashboardControls);
