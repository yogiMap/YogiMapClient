import React from 'react';
import { connect } from 'umi';
import { Button } from 'antd';
import { ISidepanel } from '@/pages/utils/sidepanel/types';

interface IProps {
  open: (arg: ISidepanel) => void;
}

const VendorDashboardControls = (props: IProps) => {
  const vendorCreate = () => {
    props.open({
      title: 'Choose the Type of Profile to Create',
      component: 'VendorFormCreate',
      place: 'VendorDashboard',
      width: 800,
    });
  };

  return (
    <Button type="primary" onClick={vendorCreate}>
      Choose the Type of Profile to Create
    </Button>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
});

export default connect(null, mapDispatchToProps)(VendorDashboardControls);
