import React from 'react';
import { connect } from 'umi';
import { Button } from 'antd';
import { ISidepanel } from '@/pages/utils/sidepanel/types';

interface IProps {
  open: (arg: ISidepanel) => void;
}

const AddressDashboardControls = (props: IProps) => {
  const addressCreate = () => {
    props.open({
      title: 'Create new Address',
      component: 'AddressFormCreate',
      place: 'AddressDashboard',
      width: '95%',
    });
  };

  return (
    <Button type="primary" onClick={addressCreate}>
      Create Address
    </Button>
  );
};

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressDashboardControls);
