import React from 'react';
import AddressDashboardControls from '@/pages/address/dashboard/controls/AddressDashboardControls';
import OrderDashboardControls from '@/pages/order/dashboard/controls/OrderDashboardControls';

interface IProps {
  clientCount: number;
}

const AddressLanding = (props: IProps) => {
  const { clientCount } = props;
  return (
    <>
      <h1>Addresses</h1>
      <p>Clients: {clientCount}</p>
      <p>Addresses is a collection of all addresses of all clients.</p>

      {clientCount ? <AddressDashboardControls /> : null}
    </>
  );
};

export default AddressLanding;
