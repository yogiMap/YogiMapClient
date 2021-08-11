import React from 'react';
import PaymentDashboardControls from '@/pages/payment/dashboard/controls/PaymentDashboardControls';

interface IProps {
  clientCount: number;
  orderCount: number;
}

const PaymentLanding = (props: IProps) => {
  const { clientCount, orderCount } = props;
  return (
    <div className="container">
      <h1>Payment</h1>

      {clientCount < 1 && <p>Clients: {clientCount}</p>}
      {orderCount < 1 && <p>Orders: {orderCount}</p>}

      <p>
        Payment is a transfer of money made with all details (amount, payment type, client, job, invoice code and so
        on).
      </p>

      {clientCount && orderCount ? <PaymentDashboardControls /> : null}
    </div>
  );
};

export default PaymentLanding;
