import React from 'react';
import { connect } from 'umi';
import { Button } from 'antd';
import { ISidepanel } from '@/pages/utils/sidepanel/types';

interface IProps {
  open: (arg: ISidepanel) => void;
}

const VendorTypeDashboardControls = (props: IProps) => {
  const vendorTypeCreate = () => {
    props.open({
      title: 'Create new VendorType',
      component: 'VendorTypeFormCreate',
      place: 'VendorTypeDashboard',
      width: 800,
    });
  };

  return (
    <Button type="primary" onClick={vendorTypeCreate}>
      Create VendorType
    </Button>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
});

export default connect(null, mapDispatchToProps)(VendorTypeDashboardControls);
